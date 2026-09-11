"use client";

import { useEffect, useMemo, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
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

type ImageEditorData = Pick<ImageData, "alt" | "caption" | "ratio">;

type ImageEditorProps = {
  file: File;
  initialData?: Partial<ImageData>;
  onImageSave: (file: File, data: ImageEditorData) => Promise<void>;
  onCancel: () => void;
  disabled?: boolean;
};

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

async function getCroppedFile(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number,
  fileName: string,
  fileType: string,
) {
  const image = new Image();

  image.src = imageSrc;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Unable to load image"));
  });

  const radians = (rotation * Math.PI) / 180;

  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));

  const rotatedWidth = image.naturalWidth * cos + image.naturalHeight * sin;

  const rotatedHeight = image.naturalWidth * sin + image.naturalHeight * cos;

  const canvasSize = Math.max(rotatedWidth, rotatedHeight);

  const canvas = document.createElement("canvas");

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas context");
  }

  ctx.translate(canvasSize / 2, canvasSize / 2);

  ctx.rotate(radians);

  ctx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Unable to create cropped canvas context");
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
    croppedCanvas.toBlob(resolve, fileType || "image/jpeg", 0.92);
  });

  if (!blob) {
    throw new Error("Unable to create cropped image");
  }

  return new File([blob], fileName, {
    type: blob.type,
    lastModified: Date.now(),
  });
}

export function ImageEditor({
  file,
  initialData,
  onImageSave,
  onCancel,
  disabled = false,
}: ImageEditorProps) {
  const imageUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

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

  const [isSaving, setIsSaving] = useState(false);

  const aspect =
    ratio === "AUTO"
      ? undefined
      : Number(ratio.split(":")[0]) / Number(ratio.split(":")[1]);

  const handleCropComplete = (_: Area, croppedPixels: Area) => {
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
    if (isSaving || disabled) return;

    setIsSaving(true);

    try {
      let editedFile = file;

      if (croppedAreaPixels) {
        editedFile = await getCroppedFile(
          imageUrl,
          croppedAreaPixels,
          rotation,
          file.name,
          file.type,
        );
      }

      await onImageSave(editedFile, {
        alt: alt.trim(),
        caption: caption.trim() || undefined,
        ratio,
      });
    } catch (error) {
      console.error("Failed to save image:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="grid min-h-0 flex-1 grid-rows-[minmax(320px,1fr)_auto] md:grid-cols-[minmax(0,1fr)_320px] md:grid-rows-none">
        {" "}
<div className="relative min-h-[360px] bg-muted/30 md:min-h-0">          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-border/60 bg-background/90 p-1 shadow-lg backdrop-blur">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={handleReset}
              disabled={isSaving || disabled}
            >
              <IconRefresh className="size-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={handleRotate}
              disabled={isSaving || disabled}
            >
              <IconRotate className="size-4" />
            </Button>
          </div>
        </div>
<div className="flex min-h-0 flex-col border-l bg-background">          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5">
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
                    disabled={isSaving || disabled}
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
                disabled={isSaving || disabled}
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
                disabled={isSaving || disabled}
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
                disabled={isSaving || disabled}
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 border-t p-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving || disabled}
              className="min-w-28"
            >
              {isSaving ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
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
