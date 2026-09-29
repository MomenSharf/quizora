"use client";

import {
  IconEdit,
  IconEye,
  IconPhotoPlus,
  IconTrash,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ImageData } from "@/features/quiz-editor/validation/image";

type ImageButtonTriggerProps = {
  image?: ImageData;
  disabled?: boolean;
  isDeleting?: boolean;
  onAdd: () => void;
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function ImageButtonTrigger({
  image,
  disabled = false,
  isDeleting = false,
  onAdd,
  onPreview,
  onEdit,
  onDelete,
}: ImageButtonTriggerProps) {
  if (!image) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onAdd}
        disabled={disabled}
        className="size-11"
        aria-label="Add image"
      >
        <IconPhotoPlus className="size-5" />
      </Button>
    );
  }

  const actionDisabled = disabled || isDeleting;

  return (
    <div className="group relative inline-flex">
      <div
        className={cn(
          "absolute -right-2 -top-10 z-10",
          "flex items-center gap-0.5 rounded-lg border bg-background p-0.5",
          "shadow-sm transition-all duration-200",
          "opacity-100 translate-y-0",
          "sm:pointer-events-none sm:opacity-0 sm:-translate-y-1",
          "sm:group-hover:pointer-events-auto sm:group-hover:opacity-100 sm:group-hover:translate-y-0",
          "sm:group-focus-within:pointer-events-auto sm:group-focus-within:opacity-100 sm:group-focus-within:translate-y-0",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onPreview}
          disabled={actionDisabled}
          className="size-7 rounded-md"
          aria-label="Preview image"
        >
          <IconEye className="size-3.5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onEdit}
          disabled={actionDisabled}
          className="size-7 rounded-md"
          aria-label="Edit image"
        >
          <IconEdit className="size-3.5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onDelete}
          disabled={actionDisabled}
          className="size-7 rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive"
          aria-label="Delete image"
        >
          {isDeleting ? (
            <span className="size-3.5 animate-spin rounded-full border-2 border-destructive/30 border-t-destructive" />
          ) : (
            <IconTrash className="size-3.5" />
          )}
        </Button>
      </div>

      <button
        type="button"
        onClick={onPreview}
        disabled={actionDisabled}
        aria-label="Preview image"
        className={cn(
          "size-14 overflow-hidden rounded-lg border bg-muted shadow-sm",
          "transition-all duration-200",
          "hover:ring-2 hover:ring-primary/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          "disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        <img
          src={image.url}
          alt={image.alt || "Uploaded image"}
          className="size-full object-cover"
        />
      </button>
    </div>
  );
}