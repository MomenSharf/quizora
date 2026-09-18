"use client";

import { useEffect, useMemo, useState } from "react";

import Cropper, { type Area } from "react-easy-crop";
import { useUploadThing } from "@/lib/uploadthing";

import {
  IconCheck,
  IconRefresh,
  IconRotate,
  IconZoomIn,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type {
  ImageData,
  MediaRatio,
} from "@/features/quiz-editor/validation/quiz/image";
import { FieldPath } from "react-hook-form";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { QuizEditor } from "../../validation/quiz";
import { deleteFile } from "@/lib/uploadthing/delete-file";

type ImageEditorProps = {
  file: File;
  initialData?: Partial<ImageData>;
  name: FieldPath<QuizEditor>;

  onImageSave: (image: ImageData) => Promise<void>;
  onCancel: () => void;
  disabled?: boolean;
};

const MAX_EDITOR_SIZE = 2400;
const JPEG_QUALITY = 0.9;

const RATIOS: {
  value: MediaRatio;
  label: string;
}[] = [
  { value: "AUTO", label: "Original" },
  { value: "1:1", label: "1:1" },
  { value: "4:3", label: "4:3" },
  { value: "3:2", label: "3:2" },
  { value: "16:9", label: "16:9" },
];

async function prepareImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selected file is not an image.");
  }

  const image = new Image();
  const objectUrl = URL.createObjectURL(file);

  try {
    image.src = objectUrl;

    await image.decode();

    const { naturalWidth, naturalHeight } = image;

    if (naturalWidth <= MAX_EDITOR_SIZE && naturalHeight <= MAX_EDITOR_SIZE) {
      return file;
    }

    const scale = Math.min(
      MAX_EDITOR_SIZE / naturalWidth,
      MAX_EDITOR_SIZE / naturalHeight,
    );

    const width = Math.round(naturalWidth * scale);
    const height = Math.round(naturalHeight * scale);

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY);
    });

    if (!blob) {
      throw new Error("Unable to resize image.");
    }

    const baseName = file.name.replace(/\.[^/.]+$/, "");

    return new File([blob], `${baseName}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function getCroppedFile(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number,
  fileName: string,
  fileType: string,
) {
  const image = new Image();

  image.src = imageSrc;

  await image.decode();

  const radians = (rotation * Math.PI) / 180;

  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));

  const rotatedWidth = image.naturalWidth * cos + image.naturalHeight * sin;

  const rotatedHeight = image.naturalWidth * sin + image.naturalHeight * cos;

  const canvasSize = Math.ceil(Math.max(rotatedWidth, rotatedHeight));

  const canvas = document.createElement("canvas");

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas context.");
  }

  ctx.translate(canvasSize / 2, canvasSize / 2);

  ctx.rotate(radians);

  ctx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  croppedCanvas.width = Math.ceil(pixelCrop.width);

  croppedCanvas.height = Math.ceil(pixelCrop.height);

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Unable to create cropped image context.");
  }

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  const blob = await new Promise<Blob | null>((resolve) => {
    croppedCanvas.toBlob(
      resolve,
      fileType === "image/png" ? "image/png" : "image/jpeg",
      0.92,
    );
  });

  if (!blob) {
    throw new Error("Unable to create cropped image.");
  }

  return new File([blob], fileName, {
    type: blob.type,
    lastModified: Date.now(),
  });
}

export function ImageEditor({
  file,
  initialData,
  name,
  onImageSave,
  onCancel,
  disabled = false,
}: ImageEditorProps) {
  const { setValue } = useQuizForm();

  const [isSaving, setIsSaving] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(true);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [rotation, setRotation] = useState(0);

  const [ratio, setRatio] = useState<MediaRatio>(initialData?.ratio ?? "AUTO");

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [alt, setAlt] = useState(initialData?.alt ?? "");

  const [caption, setCaption] = useState(initialData?.caption ?? "");

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const [prepared, setPrepared] = useState<{
    source: File;
    file: File;
  } | null>(null);

  const editorFile = prepared?.source === file ? prepared.file : null;
  const isPreparing = editorFile === null;

  useEffect(() => {
    let cancelled = false;

    prepareImage(file)
      .then((preparedFile) => {
        if (cancelled) {
          return;
        }

        setPrepared({
          source: file,
          file: preparedFile,
        });
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        console.error("Failed to prepare image:", error);

        setPrepared({
          source: file,
          file: file,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [file]);

  const imageUrl = useMemo(() => {
    if (!editorFile) {
      return null;
    }

    return URL.createObjectURL(editorFile);
  }, [editorFile]);

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const aspect =
    ratio === "AUTO"
      ? undefined
      : Number(ratio.split(":")[0]) / Number(ratio.split(":")[1]);

  const handleCropComplete = (_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleRotate = () => {
    setRotation((current) => (current + 90) % 360);
  };

  const handleReset = () => {
    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(1);
    setRotation(0);
  };

const handleSave = async () => {
  if (
    !editorFile ||
    !imageUrl ||
    !croppedAreaPixels ||
    isSaving ||
    isUploading ||
    disabled ||
    isPreparing ||
    isImageLoading
  ) {
    return;
  }

  setIsSaving(true);

  try {
    const editedFile = await getCroppedFile(
      imageUrl,
      croppedAreaPixels,
      rotation,
      editorFile.name,
      editorFile.type,
    );

    // Delete the existing UploadThing file when editing
    if (initialData?.key) {
      await deleteFile(initialData.key);
    }

    const uploadedFiles = await startUpload([editedFile]);

    const uploadedFile = uploadedFiles?.[0];

    if (!uploadedFile) {
      throw new Error("Upload completed without a file.");
    }

    const imageData: ImageData = {
      id: crypto.randomUUID(),
      url: uploadedFile.ufsUrl,
      key: uploadedFile.key,
      alt,
      caption,
      ratio,
    };

    setValue(name, imageData, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    await onImageSave(imageData);
  } catch (error) {
    console.error("Failed to save image:", error);
  } finally {
    setIsSaving(false);
  }
};

  const editorDisabled =
    disabled || isPreparing || isImageLoading || isSaving || isUploading;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-1 flex-col md:grid md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative min-h-0 h-[42vh] max-h-[520px] shrink-0 overflow-hidden bg-muted/30 sm:h-[48vh] md:h-auto md:max-h-none">
          {imageUrl && (
            <Cropper
              key={imageUrl}
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              onMediaLoaded={() => setIsImageLoading(false)}
            />
          )}

          {(isPreparing || isImageLoading) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-muted/30 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-3">
                <span className="size-8 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-foreground" />

                <span className="text-sm font-medium text-muted-foreground">
                  {isPreparing ? "Preparing image..." : "Loading image..."}
                </span>
              </div>
            </div>
          )}

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-border/60 bg-background/90 p-1 shadow-lg backdrop-blur sm:bottom-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={handleReset}
              disabled={editorDisabled}
            >
              <IconRefresh className="size-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={handleRotate}
              disabled={editorDisabled}
            >
              <IconRotate className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col border-t bg-background md:border-l md:border-t-0">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-5 p-4 sm:p-5">
              <div className="space-y-3">
                <Label>Aspect ratio</Label>

                <div className="grid grid-cols-3 gap-2">
                  {RATIOS.map((item) => (
                    <Button
                      key={item.value}
                      type="button"
                      variant={ratio === item.value ? "secondary" : "outline"}
                      className="h-9 text-xs"
                      onClick={() => setRatio(item.value)}
                      disabled={editorDisabled}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="image-zoom">Zoom</Label>

                  <IconZoomIn className="size-4 text-muted-foreground" />
                </div>

                <Input
                  id="image-zoom"
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  disabled={editorDisabled}
                  className="cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-alt">Alt text</Label>

                <Input
                  id="image-alt"
                  value={alt}
                  onChange={(event) => setAlt(event.target.value)}
                  placeholder="Describe this image"
                  maxLength={200}
                  disabled={isSaving || isUploading || disabled}
                />

                <p className="text-[11px] text-muted-foreground">
                  Helps make your quiz accessible.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-caption">
                  Caption
                  <span className="ml-1 font-normal text-muted-foreground">
                    Optional
                  </span>
                </Label>

                <Textarea
                  id="image-caption"
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  placeholder="Add a caption..."
                  maxLength={300}
                  rows={3}
                  disabled={isSaving || isUploading || disabled}
                />
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 border-t bg-background p-3 sm:p-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSaving || isUploading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              disabled={editorDisabled}
              className="min-w-32"
            >
              {isSaving || isUploading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Uploading...
                </>
              ) : (
                <>
                  <IconCheck className="size-4" />
                  Save image
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
