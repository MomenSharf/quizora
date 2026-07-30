"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { cn } from "@/lib/utils";
import { IconPhoto, IconTypography } from "@tabler/icons-react";
import { useController, useWatch } from "react-hook-form";

export default function ContentTabs({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const { control } = useQuizForm();

  const { field: modeField } = useController({
    control,
    name: `questions.${questionIndex}.content.mode`,
  });

  const { field: textField } = useController({
    control,
    name: `questions.${questionIndex}.content.text`,
  });

  const { field: imageField } = useController({
    control,
    name: `questions.${questionIndex}.content.image`,
  });

  const mode = useWatch({
    control,
    name: `questions.${questionIndex}.content.mode`,
  });

  return (
    <div className="space-y-4">
      <TooltipProvider delayDuration={150}>
        <div className="inline-flex rounded-xl border bg-muted/40 p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant={mode === "TEXT" ? "default" : "ghost"}
                className={cn(
                  "size-10 rounded-lg transition-all",
                  mode === "TEXT" &&
                    "bg-primary text-primary-foreground shadow-sm",
                )}
                onClick={() => modeField.onChange("TEXT")}
              >
                <IconTypography className="size-5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Text Content</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant={mode === "IMAGE" ? "default" : "ghost"}
                className={cn(
                  "size-10 rounded-lg transition-all",
                  mode === "IMAGE" &&
                    "bg-primary text-primary-foreground shadow-sm",
                )}
                onClick={() => modeField.onChange("IMAGE")}
              >
                <IconPhoto className="size-5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Image Content</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {mode === "TEXT" ? (
        <div className="rounded-xl border bg-card p-2">
          <RichTextEditor
            content={textField.value}
            onChange={textField.onChange}
            placeholder="Describe what players need to guess..."
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed bg-muted/30 p-8">
          <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full border bg-background">
              <IconPhoto className="size-8 text-muted-foreground" />
            </div>

            <div className="space-y-1 text-center">
              <h4 className="font-medium">Image</h4>
              <p className="text-sm text-muted-foreground">
                Paste an image URL or replace this with your upload component.
              </p>
            </div>

            <input
              value={imageField.value ?? ""}
              onChange={imageField.onChange}
              placeholder="https://example.com/image.png"
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary"
            />

            {imageField.value && (
              <div className="overflow-hidden rounded-xl border bg-background">
                <img
                  src={imageField.value}
                  alt="Preview"
                  className="max-h-80 w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}