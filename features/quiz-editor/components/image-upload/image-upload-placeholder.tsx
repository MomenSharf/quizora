"use client";

import { useRef, useState } from "react";
import { IconPhotoPlus, IconUpload } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type ImageUploadPlaceholderProps = {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
};

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
] as const;

const ACCEPT_ATTRIBUTE = ACCEPTED_TYPES.join(",");
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function ImageUploadPlaceholder({
  onImageSelect,
  disabled = false,
}: ImageUploadPlaceholderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file?: File) => {
    if (!file || disabled) return;

    const isValidType = ACCEPTED_TYPES.includes(
      file.type as (typeof ACCEPTED_TYPES)[number],
    );

    if (!isValidType || file.size > MAX_FILE_SIZE) {
      return;
    }

    onImageSelect(file);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsDragging(false);

    if (!disabled) {
      handleFile(event.dataTransfer.files?.[0]);
    }
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (
    event: React.DragEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "group relative flex size-full min-h-[320px]",
          "flex-col items-center justify-center",
          "overflow-hidden rounded-xl",
          "border border-dashed",
          "px-6 py-10 text-center",
          "transition-all duration-200",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary",
          "focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",

          !isDragging && [
            "border-border/80 bg-background",
            "hover:border-primary/40",
            "hover:bg-primary/[0.015]",
          ],

          isDragging && [
            "border-primary",
            "bg-primary/[0.04]",
            "ring-2 ring-primary/15",
          ],
        )}
      >
        {/* Subtle hover glow */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            "bg-[radial-gradient(circle_at_50%_20%,hsl(var(--primary)/0.08),transparent_55%)]",
            "opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
            isDragging && "opacity-100",
          )}
        />

        {/* Icon */}
        <div
          className={cn(
            "relative flex size-14 items-center justify-center",
            "rounded-2xl",
            "bg-primary/10 text-primary",
            "ring-1 ring-primary/10",
            "transition-transform duration-200",
            "group-hover:scale-105",
            isDragging && "scale-105",
          )}
        >
          <IconPhotoPlus
            className={cn(
              "size-7 transition-transform duration-200",
              isDragging && "scale-110",
            )}
          />
        </div>

        {/* Text */}
        <div className="relative mt-5 space-y-1.5">
          <h3 className="text-sm font-semibold">
            {isDragging ? "Drop your image here" : "Upload an image"}
          </h3>

          <p className="text-xs text-muted-foreground">
            {isDragging
              ? "Release to upload your image"
              : "Drag and drop an image here, or browse your device"}
          </p>
        </div>

        {/* Action */}
        <div
          className={cn(
            "relative mt-5 inline-flex h-9 items-center gap-2",
            "rounded-lg bg-primary px-3.5",
            "text-xs font-medium text-primary-foreground",
            "shadow-sm",
            "transition-all duration-200",
            "group-hover:shadow-md",
          )}
        >
          <IconUpload className="size-3.5" />
          Browse images
        </div>

        {/* File information */}
        <div className="relative mt-5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>PNG, JPG or WEBP</span>
          <span className="size-1 rounded-full bg-muted-foreground/40" />
          <span>Up to 5 MB</span>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTRIBUTE}
        className="hidden"
        onChange={handleInputChange}
        disabled={disabled}
      />
    </>
  );
}