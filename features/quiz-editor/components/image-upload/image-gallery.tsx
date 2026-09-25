"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { GALLERY_IMAGES, GalleryImage } from "../../constants/gallery-images";
import { toast } from "sonner";

type ImageGalleryProps = {
  onSelect: (file: File) => void;
  selectedId?: string;
  disabled?: boolean;
};

export function ImageGallery({
  onSelect,
  selectedId,
  disabled = false,
}: ImageGalleryProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleImageSelect = async (galleryImage: GalleryImage) => {
    if (loadingId || disabled) return;

    setLoadingId(galleryImage.id);

    try {
      const response = await fetch(galleryImage.src);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }

      const blob = await response.blob();

      const extension =
        blob.type.split("/")[1] ||
        galleryImage.src.split(".").pop()?.split("?")[0] ||
        "jpg";

      const file = new File(
        [blob],
        `${galleryImage.id}.${extension}`,
        {
          type: blob.type,
        },
      );

      onSelect(file);
    } catch (error) {
      toast.error("Failed to select image.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="size-full overflow-y-auto">
      <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY_IMAGES.map((image) => {
          const isSelected = selectedId === image.id;
          const isLoading = loadingId === image.id;

          return (
            <button
              key={image.id}
              type="button"
              disabled={disabled || loadingId !== null}
              onClick={() => handleImageSelect(image)}
              className={cn(
                "group relative aspect-video overflow-hidden rounded-xl",
                "border bg-muted/30 transition-all",
                "hover:ring-2 hover:ring-primary/30",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-primary",
                "disabled:pointer-events-none disabled:opacity-50",
                isSelected && "ring-2 ring-primary",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={cn(
                  "object-cover",
                  "transition-transform duration-300",
                  "group-hover:scale-105",
                )}
              />

              <div
                className={cn(
                  "absolute inset-0 bg-black/0 transition-colors",
                  "group-hover:bg-black/10",
                  isSelected && "bg-black/10",
                  isLoading && "bg-black/30",
                )}
              />

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-7 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
              )}

              {isSelected && !isLoading && (
                <div className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
