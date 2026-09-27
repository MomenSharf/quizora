"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import type { ImageData } from "@/features/quiz-editor/validation/image";
import { cn } from "@/lib/utils";

type ImagePreviewProps = {
  image: ImageData;
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function ImagePreview({
  image,
  disabled = false,
  onEdit,
  onDelete,
}: ImagePreviewProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 p-6">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border bg-muted/20">
        <Image
          src={image.url}
          alt="Image preview"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>

      <div className="flex shrink-0 items-center justify-end gap-3">
        <button
          type="button"
          onClick={onDelete}
          disabled={disabled}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-2",
            "rounded-lg border border-destructive/30 px-4",
            "text-sm font-medium text-destructive",
            "transition-colors hover:bg-destructive/10",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <Trash2 className="size-4" />
          Delete
        </button>

        <button
          type="button"
          onClick={onEdit}
          disabled={disabled}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-2",
            "rounded-lg bg-primary px-4",
            "text-sm font-medium text-primary-foreground",
            "transition-colors hover:bg-primary/90",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <Pencil className="size-4" />
          Edit image
        </button>
      </div>
    </div>
  );
}