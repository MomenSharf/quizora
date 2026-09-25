"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FieldPath } from "react-hook-form";
import { IconCheck, IconPhoto, IconUpload } from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { ImageData } from "@/features/quiz-editor/validation/image";

import { cn } from "@/lib/utils";
import type { QuizEditor } from "../../validation/quiz";
import { ImageEditor } from "./image-editor";
import { ImageGallery } from "./image-gallery";
import { ImageUploadPlaceholder } from "./image-upload-placeholder";
import { GalleryImage } from "../../constants/gallery-images";

type ImageUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: FieldPath<QuizEditor>;
  image?: ImageData;
  disabled?: boolean;
  file: File | null;
  setFile: (file: File | null) => void;
};

type ImageSource = "upload" | "gallery";

const TAB_ITEMS = [
  {
    value: "upload" as const,
    label: "Upload",
    description: "From your device",
    icon: IconUpload,
  },
  {
    value: "gallery" as const,
    label: "Gallery",
    description: "From Quizora",
    icon: IconPhoto,
  },
];

export function ImageUploadDialog({
  open,
  onOpenChange,
  name,
  image,
  disabled = false,
  file,
  setFile,
}: ImageUploadDialogProps) {
  const [source, setSource] = useState<ImageSource>("upload");

  const isEditing = Boolean(file);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFile(null);
      setSource("upload");
    }

    onOpenChange(nextOpen);
  };

  const handleImageSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleCancelEditor = () => {
    setFile(null);
  };

  const onImageSaved = async () => {
    onOpenChange(false);
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col gap-0 overflow-hidden p-0",
          "h-[min(900px,90vh)]",
          "w-[calc(100vw-2rem)]",
          "max-w-300!",
          "sm:w-[calc(100vw-3rem)]",
        )}
        onInteractOutside={(event) => {
          if (disabled) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (disabled) event.preventDefault();
        }}
      >
        <DialogHeader className="shrink-0 px-6 py-5">
          <DialogTitle className="text-base font-semibold">
            {isEditing || image ? "Edit image" : "Choose an image"}
          </DialogTitle>
        </DialogHeader>

        {file ? (
          <div className="min-h-0 flex-1 overflow-hidden">
            <ImageEditor
              file={file}
              initialData={image}
              name={name}
              onImageSaved={onImageSaved}
              onCancel={handleCancelEditor}
              disabled={disabled}
            />
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col px-6 pb-6">
            {/* Source selector */}
            <div className="mb-5 shrink-0">
              <div className="relative flex w-full rounded-xl bg-muted/60 p-1">
                {TAB_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = source === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSource(item.value)}
                      className={cn(
                        "relative z-10 flex min-w-0 flex-1 items-center",
                        "justify-center gap-2.5 rounded-lg px-4 py-2.5",
                        "outline-none transition-colors",
                        "focus-visible:ring-2 focus-visible:ring-primary",
                        "disabled:pointer-events-none disabled:opacity-50",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="image-source-active"
                          className="absolute inset-0 -z-10 rounded-lg bg-background shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}

                      <div
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-md",
                          "transition-colors duration-200",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground",
                        )}
                      >
                        <Icon className="size-4" />
                      </div>

                      <div className="min-w-0 text-left">
                        <div className="text-sm font-medium leading-none">
                          {item.label}
                        </div>

                        <div className="mt-1 text-[11px] leading-none text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border bg-muted/20">
              {/* Upload */}
              <motion.div
                initial={false}
                animate={{
                  opacity: source === "upload" ? 1 : 0,
                  x: source === "upload" ? 0 : -8,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "absolute inset-0",
                  source !== "upload" && "pointer-events-none",
                )}
                aria-hidden={source !== "upload"}
              >
                <div className="size-full overflow-y-auto p-5">
                  <ImageUploadPlaceholder
                    onImageSelect={handleImageSelect}
                    disabled={disabled}
                  />
                </div>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={false}
                animate={{
                  opacity: source === "gallery" ? 1 : 0,
                  x: source === "gallery" ? 0 : 8,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "absolute inset-0",
                  source !== "gallery" && "pointer-events-none",
                )}
                aria-hidden={source !== "gallery"}
              >
                <ImageGallery
                  onSelect={handleImageSelect}
                  disabled={disabled}
                />
              </motion.div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
