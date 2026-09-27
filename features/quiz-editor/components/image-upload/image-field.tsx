"use client";

import { useState } from "react";
import { useController, type FieldPath } from "react-hook-form";

import type { ImageData } from "@/features/quiz-editor/validation/image";
import type { QuizEditor } from "../../validation/quiz";

import { useQuizForm } from "../../hooks/use-quiz-form";
import { deleteFile } from "@/lib/uploadthing/delete-file";

import { ImageDialog } from "./image-dialog";
import { toast } from "sonner";

export type DialogMode = "upload" | "edit" | "preview";

type ImageFieldTriggerProps = {
  image?: ImageData;
  disabled?: boolean;
  isDeleting?: boolean;
  onAdd: () => void;
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
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
  const [dialogMode, setDialogMode] = useState<DialogMode>("upload");

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
    setDialogMode("upload");
    setDialogOpen(true);
  };

  const handlePreview = () => {
    if (disabled || !image || isDeleting) return;

    setFile(null);
    setDialogMode("preview");
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (disabled || !image || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteFile(image.key);
      field.onChange(undefined);
      setDialogOpen(false);
      setFile(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete image.");
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

      const imageFile = new File([blob], image.alt || "image", {
        type: blob.type || "image/jpeg",
      });

      setFile(imageFile);
      setDialogMode("edit");
      setDialogOpen(true);
    } catch (error) {
      console.error("Failed to prepare image for editing:", error);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);

    if (!open) {
      setFile(null);
    }
  };

  return (
    <>
      {trigger({
        image,
        disabled,
        isDeleting,
        onAdd: handleAdd,
        onPreview: handlePreview,
        onEdit: handleEdit,
        onDelete: handleDelete,
      })}

      <ImageDialog
        open={dialogOpen}
        onOpenChange={handleDialogChange}
        name={name}
        image={image}
        disabled={disabled || isDeleting}
        file={file}
        setFile={setFile}
        mode={dialogMode}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}
