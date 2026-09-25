"use client";

import { useState } from "react";
import { useController, type FieldPath } from "react-hook-form";

import { ImageUploadDialog } from "./image-upload-dialog";

import type { ImageData } from "@/features/quiz-editor/validation/image";
import { QuizEditor } from "../../validation/quiz";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { deleteFile } from "@/lib/uploadthing/delete-file";

type ImageFieldTriggerProps = {
  image?: ImageData;
  disabled?: boolean;
  isDeleting?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
};

type ImageFieldProps = {
  name: FieldPath<QuizEditor>;
  disabled?: boolean;
  trigger: (props: ImageFieldTriggerProps) => React.ReactNode;
};

export function ImageField({
  name,
  disabled = false,
  trigger,
}: ImageFieldProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { control } = useQuizForm();

  const { field } = useController({
    control,
    name,
  });

  const image = field.value as ImageData | undefined;

  const handleAdd = () => {
    if (disabled || isDeleting) return;

    setFile(null);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (disabled || !image || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteFile(image.key);
      field.onChange(undefined);
    } catch (error) {
      console.error("Failed to delete image:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async () => {
    if (disabled || !image?.url || isDeleting) return;

    try {
      const response = await fetch(image.url);

      if (!response.ok) {
        throw new Error("Failed to load image");
      }

      const blob = await response.blob();

      const file = new File([blob], image.alt || "image", {
        type: blob.type || "image/jpeg",
      });

      setFile(file);
      setDialogOpen(true);
    } catch (error) {
      console.error("Failed to prepare image for editing:", error);
    }
  };

  return (
    <>
      {trigger({
        image,
        disabled,
        isDeleting,
        onAdd: handleAdd,
        onEdit: handleEdit,
        onDelete: handleDelete,
      })}

      <ImageUploadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        name={name}
        image={image}
        disabled={disabled || isDeleting}
        file={file}
        setFile={setFile}
      />
    </>
  );
}
