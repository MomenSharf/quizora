"use client";

import { useState } from "react";
import type { FieldPath, FieldValues } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { ImageData } from "@/features/quiz-editor/validation/image";

import { ImageUploadPlaceholder } from "./image-upload-placeholder";
import { ImageEditor } from "./image-editor";
import { cn } from "@/lib/utils";
import { QuizEditor } from "../../validation/quiz";

type ImageUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: FieldPath<QuizEditor>;
  image?: ImageData;
  disabled?: boolean;
  file: File | null;
  setFile: (file: File | null) => void;
};

export function ImageUploadDialog({
  open,
  onOpenChange,
  name,
  image,
  disabled = false,
  file,
  setFile,
}: ImageUploadDialogProps) {
  const isEditing = Boolean(file);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFile(null);
    }

    onOpenChange(nextOpen);
  };

  const handleImageSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleCancelEditor = () => {
    setFile(null);
  };

  const handleImageSave = async (image: ImageData) => {
    onOpenChange(false);
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col gap-0 overflow-hidden p-0",
          "h-[90vh] max-h-[900px]",
          "w-[calc(100vw-2rem)]",
          "!max-w-[1200px]",
          "sm:w-[calc(100vw-3rem)]",
        )}
        onInteractOutside={(event) => {
          if (disabled) {
            event.preventDefault();
          }
        }}
        onEscapeKeyDown={(event) => {
          if (disabled) {
            event.preventDefault();
          }
        }}
      >
        <DialogHeader
          className={cn(
            "flex h-14 shrink-0 flex-row items-center",
            "border-b px-5",
          )}
        >
          <DialogTitle>
            {isEditing || image ? "Edit image" : "Upload image"}
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-hidden">
          {file ? (
            <ImageEditor
              file={file}
              initialData={image}
              name={name}
              onImageSave={handleImageSave}
              onCancel={handleCancelEditor}
              disabled={disabled}
            />
          ) : (
            <div
              className={cn(
                "flex size-full items-center justify-center",
                "overflow-y-auto p-6 sm:p-10",
              )}
            >
              <div className="w-full max-w-3xl">
                <ImageUploadPlaceholder
                  onImageSelect={handleImageSelect}
                  disabled={disabled}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
