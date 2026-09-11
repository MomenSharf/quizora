"use client";

import { useState } from "react";
import { useController, useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import {
  IconEdit,
  IconPhoto,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { ImageData } from "@/features/quiz-editor/validation/quiz/image";
import { ImageUploadDialog } from "./image-upload-dialog";

type ImageFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  disabled?: boolean;
};

export function ImageField<TFieldValues extends FieldValues = FieldValues>({
  name,
  disabled = false,
}: ImageFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const { field } = useController({
    control,
    name,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const image = field.value as ImageData | undefined;

  const handleDelete = () => {
    if (disabled) return;

    field.onChange(undefined);
  };

  return (
    <>
      <div className="space-y-3">
        {image ? (
          <div className="group relative overflow-hidden rounded-xl border bg-muted/20">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <img
                src={image.url}
                alt={image.alt || "Uploaded image"}
                className="size-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <div className="absolute bottom-3 right-3 flex translate-y-2 items-center gap-1.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="size-8 shadow-lg"
                        onClick={() => setDialogOpen(true)}
                        disabled={disabled}
                      >
                        <IconEdit className="size-4" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>Edit image</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="size-8 shadow-lg"
                        onClick={handleDelete}
                        disabled={disabled}
                      >
                        <IconTrash className="size-4" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>Delete image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">
                  {image.alt || "Image"}
                </p>

                {image.caption && (
                  <p className="truncate text-[11px] text-muted-foreground">
                    {image.caption}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => setDialogOpen(true)}
                        disabled={disabled}
                      >
                        <IconEdit className="size-3.5" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>Edit image</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={handleDelete}
                        disabled={disabled}
                      >
                        <IconTrash className="size-3.5" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>Delete image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setDialogOpen(true)}
            className={[
              "group flex min-h-48 w-full flex-col items-center justify-center",
              "rounded-xl border border-dashed border-border",
              "bg-muted/20 px-6 py-8 text-center",
              "transition-all duration-200",
              "hover:border-primary/40 hover:bg-primary/[0.03]",
              "hover:shadow-sm",
              "disabled:pointer-events-none disabled:opacity-50",
            ].join(" ")}
          >
            <div className="flex size-12 items-center justify-center rounded-xl border bg-background shadow-sm transition-transform duration-200 group-hover:scale-105">
              <IconPhoto className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium">Add image</p>

              <p className="text-xs text-muted-foreground">
                Upload and edit an image
              </p>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              <IconPlus className="size-3.5" />
              Choose image
            </div>
          </button>
        )}

        <ImageUploadDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          name={name}
          image={image}
          disabled={disabled}
        />
      </div>
    </>
  );
}