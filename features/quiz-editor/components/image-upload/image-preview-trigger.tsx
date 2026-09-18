"use client";

import {
  IconEdit,
  IconPhoto,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import type { ImageData } from "@/features/quiz-editor/validation/quiz/image";

type ImagePreviewTriggerProps = {
  image?: ImageData;
  disabled?: boolean;
  isDeleting?: boolean;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ImagePreviewTrigger({
  image,
  disabled = false,
  isDeleting = false,
  onAdd,
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
          "flex min-h-44 w-full flex-col items-center justify-center",
          "rounded-xl border border-dashed",
          "bg-muted/20 px-6 py-7 text-center",
          "transition-colors",
          "hover:border-primary/40 hover:bg-primary/[0.03]",
          "disabled:pointer-events-none disabled:opacity-50",
        ].join(" ")}
      >
        <div className="flex size-11 items-center justify-center rounded-lg border bg-background shadow-sm">
          <IconPhoto className="size-5 text-muted-foreground" />
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-sm font-medium">
            Add image
          </p>

          <p className="text-xs text-muted-foreground">
            Upload and edit an image
          </p>
        </div>

        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
          <IconPlus className="size-3.5" />
          Choose image
        </div>
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="relative aspect-[16/9] max-h-80 w-full bg-muted/30">
        <img
          src={image.url}
          alt={image.alt || "Uploaded image"}
          className="size-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
            <IconPhoto className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium">
              {image.alt || "Uploaded image"}
            </p>

            {image.caption ? (
              <p className="truncate text-[11px] text-muted-foreground">
                {image.caption}
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                Image
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2.5"
            onClick={onEdit}
            disabled={disabled || isDeleting}
          >
            <IconEdit className="size-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={onDelete}
            disabled={disabled || isDeleting}
            aria-label="Delete image"
          >
            {isDeleting ? (
              <span className="size-3.5 animate-spin rounded-full border-2 border-destructive/30 border-t-destructive" />
            ) : (
              <IconTrash className="size-3.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
