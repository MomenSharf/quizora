"use client";

import { useRef, useState } from "react";
import { IconPhotoPlus, IconUpload } from "@tabler/icons-react";

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

    if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
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

    if (disabled) return;

    handleFile(event.dataTransfer.files?.[0]);
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
    if (disabled) return;

    inputRef.current?.click();
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
        className={[
          "group relative flex h-full w-full cursor-pointer flex-col",
          "items-center justify-center overflow-hidden rounded-xl",
          "border border-dashed border-border bg-background",
          "px-6 py-8 text-center transition-all duration-200",
          "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg",
          "disabled:pointer-events-none disabled:opacity-50",
          isDragging &&
            "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at top, oklch(from var(--primary) l c h / 0.18) 0%, transparent 70%)",
          }}
        />

        <div
          className={[
            "relative flex size-14 items-center justify-center rounded-xl",
            "border border-primary/25 bg-primary/10 text-primary",
            "transition-all duration-200",
            "group-hover:scale-105",
            isDragging && "scale-105",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <IconPhotoPlus
            className={[
              "size-7 transition-transform duration-200",
              "group-hover:scale-110",
              isDragging && "scale-110",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </div>

        <div className="relative mt-4 space-y-1">
          <h3 className="text-sm font-semibold">
            {isDragging ? "Drop image here" : "Upload image"}
          </h3>

          <p className="text-xs text-muted-foreground">
            {isDragging
              ? "Release to select your image"
              : "Drag & drop or click to browse"}
          </p>
        </div>

        <div className="relative mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-primary">
          <IconUpload className="size-3.5" />
          Choose Image
        </div>

        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px]">
          <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
            PNG
          </span>

          <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
            JPG
          </span>

          <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
            WEBP
          </span>

          <span className="rounded-full bg-primary/12 px-2 py-1 font-medium text-primary">
            Max 5 MB
          </span>
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