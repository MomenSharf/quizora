"use client";

import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ImageField } from "../../../image-upload/image-field";
import ImagePreviewTrigger from "../../../image-upload/image-preview-trigger";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import RichTextEditor from "@/components/rich-text-editor";
import { FieldError } from "../../../issues/field-error";

interface FlashcardEditorProps {
  questionIndex: number;
}

export function FlashcardEditor({
  questionIndex,
}: FlashcardEditorProps) {
  const [flipped, setFlipped] = useState(false);
  const [height, setHeight] = useState<number>();

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const { control } = useQuizForm();

  useEffect(() => {
    const front = frontRef.current;
    const back = backRef.current;

    if (!front || !back) return;

    const updateHeight = () => {
      const activeHeight = flipped
        ? back.scrollHeight
        : front.scrollHeight;

      setHeight(activeHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);

    observer.observe(front);
    observer.observe(back);

    return () => observer.disconnect();
  }, [flipped]);

  return (
    <div className="w-full [perspective:1200px]">
      <motion.div
        animate={{
          height,
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          height: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          },
          rotateY: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={frontRef}
          className="absolute inset-x-0 top-0 rounded-2xl border bg-card p-5 shadow-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Front
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setFlipped(true)}
              className="size-8 rounded-full text-muted-foreground"
            >
              <RotateCw className="size-4" />
              <span className="sr-only">Flip to back</span>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <Controller
              control={control}
              name={`questions.${questionIndex}.content.front.title`}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value ?? ""}
                  dataFieldNames={`questions.${questionIndex}.content.front.title`}
                  onChange={field.onChange}
                  placeholder="Front title..."
                />
              )}
            />

            <Controller
              control={control}
              name={`questions.${questionIndex}.content.front.content`}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value ?? ""}
                  dataFieldNames={`questions.${questionIndex}.content.front.content`}
                  onChange={field.onChange}
                  placeholder="Write the front content..."
                />
              )}
            />

            <ImageField
              name={`questions.${questionIndex}.content.front.image`}
              trigger={(props) => <ImagePreviewTrigger {...props} />}
            />
          </div>
        </div>

        <div
          ref={backRef}
          className="absolute inset-x-0 top-0 rounded-2xl border bg-card p-5 shadow-sm"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Back
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setFlipped(false)}
              className="size-8 rounded-full text-muted-foreground"
            >
              <RotateCw className="size-4" />
              <span className="sr-only">Flip to front</span>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <Controller
              control={control}
              name={`questions.${questionIndex}.content.back.title`}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value ?? ""}
                  dataFieldNames={`questions.${questionIndex}.content.back.title`}
                  onChange={field.onChange}
                  placeholder="Back title..."
                />
              )}
            />

            <Controller
              control={control}
              name={`questions.${questionIndex}.content.back.content`}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value ?? ""}
                  dataFieldNames={`questions.${questionIndex}.content.back.content`}
                  onChange={field.onChange}
                  placeholder="Write the back content..."
                />
              )}
            />

            <ImageField
              name={`questions.${questionIndex}.content.back.image`}
              trigger={(props) => <ImagePreviewTrigger {...props} />}
            />
          </div>
        </div>
      </motion.div>
      <br />
      <FieldError control={control} name={`questions.${questionIndex}.content.front.title`} />
      <FieldError control={control} name={`questions.${questionIndex}.content.front.content`} />
      <FieldError control={control} name={`questions.${questionIndex}.content.front.image`} />
      <FieldError control={control} name={`questions.${questionIndex}.content.back.title`} /> 
      <FieldError control={control} name={`questions.${questionIndex}.content.back.content`} /> 
      <FieldError control={control} name={`questions.${questionIndex}.content.back.image`} />
    </div>
  );
}