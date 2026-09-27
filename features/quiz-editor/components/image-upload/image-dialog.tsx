"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ImageData } from "@/features/quiz-editor/validation/image";
import { cn } from "@/lib/utils";

import type { FieldPath } from "react-hook-form";

import type { QuizEditor } from "../../validation/quiz";
import { ImageEditor } from "./image-editor";
import { ImagePreview } from "./image-preview";
import { ImageUploadPlaceholder } from "./image-upload-placeholder";
import { DialogMode } from "./image-field";


type ImageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: FieldPath<QuizEditor>;
  image?: ImageData;
  disabled?: boolean;
  file: File | null;
  setFile: (file: File | null) => void;
  mode: DialogMode;
  onDelete?: () => void;
  onEdit?: () => void;
};

export function ImageDialog({
  open,
  onOpenChange,
  name,
  image,
  disabled = false,
  file,
  setFile,
  mode: initialMode,
  onDelete,
  onEdit,
}: ImageDialogProps) {
  const [mode, setMode] = useState<DialogMode>(initialMode);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode(initialMode);
    }
  }, [open, initialMode]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFile(null);
    }

    onOpenChange(nextOpen);
  };

  const handleImageSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setMode("edit");
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      return;
    }

    if (file) {
      setMode("edit");
    }
  };

  const handleCancelEditor = () => {
    setFile(null);
    setMode(image ? "preview" : "upload");
  };

  const handleImageSaved = async () => {
    setFile(null);
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (disabled) return;

    setFile(null);
    onDelete?.();
    onOpenChange(false);
  };

  const title = {
    upload: "Choose an image",
    edit: "Edit image",
    preview: "Image preview",
  }[mode];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col gap-0 overflow-hidden p-0",
          "h-[min(900px,90vh)]",
          "w-[calc(100vw-2rem)]",
          "max-w-300!",
          "sm:w-[calc(100vw-3rem)]",
        )}
        onInteractOutside={(event) => {
          if (disabled) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (disabled) event.preventDefault();
        }}
      >
        <DialogHeader className="shrink-0 px-6 py-5">
          <DialogTitle className="text-base font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        {mode === "preview" && image ? (
          <ImagePreview
            image={image}
            disabled={disabled}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : mode === "edit" && file ? (
          <div className="min-h-0 flex-1 overflow-hidden">
            <ImageEditor
              file={file}
              initialData={image}
              name={name}
              onImageSaved={handleImageSaved}
              onCancel={handleCancelEditor}
              disabled={disabled}
            />
          </div>
        ) : (
          <div className="min-h-0 flex-1 px-6 pb-6">
            <div className="size-full overflow-y-auto rounded-2xl border bg-muted/20 p-5">
              <ImageUploadPlaceholder
                onImageSelect={handleImageSelect}
                disabled={disabled}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}