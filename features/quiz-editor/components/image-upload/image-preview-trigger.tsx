"use client";

import {
  IconEdit,
  IconEye,
  IconPhoto,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import type { ImageData } from "@/features/quiz-editor/validation/image";

type ImagePreviewTriggerProps = {
  image?: ImageData;
  disabled?: boolean;
  isDeleting?: boolean;
  onAdd: () => void;
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ImagePreviewTrigger({
  image,
  disabled = false,
  isDeleting = false,
  onAdd,
  onPreview,
  onEdit,
  onDelete,
}: ImagePreviewTriggerProps) {
  if (!image) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onAdd}
        className={[
          "group flex min-h-32 w-full flex-col items-center justify-center",
          "rounded-lg border border-dashed",
          "bg-muted/20 px-4 py-5 text-center",
          "transition-colors duration-150",
          "hover:border-primary/40 hover:bg-primary/[0.03]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          "disabled:pointer-events-none disabled:opacity-50",
        ].join(" ")}
      >
        <span className="flex size-9 items-center justify-center rounded-md border bg-background shadow-sm transition-colors group-hover:border-primary/20">
          <IconPhoto className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
        </span>

        <div className="mt-2.5">
          <p className="text-xs font-medium">Add image</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Upload an image for this question
          </p>
        </div>

        <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
          <IconPlus className="size-3" />
          Choose image
        </span>
      </button>
    );
  }

  const isDisabled = disabled || isDeleting;

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <button
        type="button"
        onClick={onPreview}
        disabled={isDisabled}
        aria-label="Preview image"
        className={[
          "group relative block aspect-[16/9] w-full overflow-hidden bg-muted/30",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary/40 focus-visible:ring-inset",
          "disabled:pointer-events-none disabled:opacity-60",
        ].join(" ")}
      >
        <img
          src={image.url}
          alt={image.alt || "Uploaded image"}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
        />

        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/20 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-black/65 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm">
            <IconEye className="size-3" />
            Preview
          </span>
        </span>
      </button>

      <div className="flex min-h-12 items-center justify-between gap-2 border-t px-2.5 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
            <IconPhoto className="size-3.5 text-muted-foreground" />
          </div>

          <div className="min-w-0 leading-none">
            <p className="truncate text-[11px] font-medium">
              {image.alt || "Uploaded image"}
            </p>

            <p className="mt-1 truncate text-[10px] text-muted-foreground">
              {image.caption || "Image"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 rounded-md"
            onClick={onPreview}
            disabled={isDisabled}
            aria-label="Preview image"
          >
            <IconEye className="size-3.5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 rounded-md"
            onClick={onEdit}
            disabled={isDisabled}
            aria-label="Edit image"
          >
            <IconEdit className="size-3.5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={onDelete}
            disabled={isDisabled}
            aria-label="Delete image"
          >
            {isDeleting ? (
              <span className="size-3 animate-spin rounded-full border-2 border-destructive/25 border-t-destructive" />
            ) : (
              <IconTrash className="size-3.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}