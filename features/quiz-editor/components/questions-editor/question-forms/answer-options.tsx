"use client";

import {
  Check,
  GripVertical,
  ImagePlus,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { createSingleSelectQuestion } from "@/features/quiz-editor/create-defaults/questions/single-select-question";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { cn } from "@/lib/utils";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useController, useFieldArray, useWatch } from "react-hook-form";

function SortableAnswerOption({
  fieldId,
  index,
  autoResize,
  textareaRef,
  questionIndex,
}: {
  fieldId: string;
  index: number;
  autoResize: (textarea: HTMLTextAreaElement) => void;
  textareaRef: (el: HTMLTextAreaElement | null) => void;
  questionIndex: number;
}) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);

  const { control, setValue } = useQuizForm();

  const { field: textField } = useController({
    control,
    name: `questions.${questionIndex}.content.options.${index}.text`,
  });

  const correctOptionId = useWatch({
    control,
    name: `questions.${questionIndex}.content.correctOptionId`,
  });

  const { isDragging } = useSortable({
    id: fieldId,
    index,
    element,
    handle: handleRef,
  });

  const IsCorrect = correctOptionId === fieldId;

  return (
    <div
      ref={setElement}
      className={cn(
        "group flex items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        isDragging && "z-50 scale-[1.02] shadow-xl ring-2 ring-primary",
      )}
    >
      <button
        ref={handleRef}
        className="mt-2 cursor-grab rounded-md p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <GripVertical className="size-5" />
      </button>

      <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
        {index + 1}
      </div>

      <Button
        size="icon"
        variant={IsCorrect ? "default" : "outline"}
        className="mt-1 size-9 shrink-0 rounded-full"
        onClick={() => {
          setValue(
            `questions.${questionIndex}.content.correctOptionId`,
            IsCorrect ? "" : fieldId,
            {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            },
          );
        }}
      >
        <Check className="size-4" />
      </Button>

      <button className="mt-1 flex size-14 shrink-0 items-center justify-center rounded-lg border border-dashed bg-muted/40 transition-colors hover:bg-muted">
        <ImagePlus className="size-5 text-muted-foreground" />
      </button>

      <div className="p-1 border rounded-md w-full">
        <textarea
          {...textField}
          ref={(el) => {
            textField.ref(el);
            textareaRef(el);

            if (el) {
              requestAnimationFrame(() => autoResize(el));
            }
          }}
          onInput={(e) => autoResize(e.currentTarget)}
          rows={1}
          placeholder={`Answer ${index + 1}`}
          className="w-full min-h-11 resize-y overflow-y-auto bg-transparent rounded-md text-sm leading-6 outline-none placeholder:text-muted-foreground"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="mt-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <MoreHorizontal className="size-5" />
      </Button>
    </div>
  );
}

interface Props {
  questionIndex: number;
}

export function AnswerOptions({ questionIndex }: Props) {
  const { control } = useQuizForm();

  const { fields, append, move } = useFieldArray({
    control,
    name: `questions.${questionIndex}.content.options`,
  });

  const textareas = useRef<(HTMLTextAreaElement | null)[]>([]);

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="space-y-3 p-4">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          const sourceId = event.operation.source?.id;
          const targetId = event.operation.target?.id;
          const sourceIndex = fields.findIndex((f) => f.id === sourceId);
          const targetIndex = fields.findIndex((f) => f.id === targetId);

          console.log(sourceId, targetId); // firt

          if (sourceIndex !== -1 && targetIndex !== -1) {
            move(sourceIndex, targetIndex);
          }
        }}
      >
        <div className="space-y-3">
          {fields.map((field, index) => (
            <SortableAnswerOption
              key={field.id}
              fieldId={field.id}
              index={index}
              autoResize={autoResize}
              textareaRef={(el) => {
                textareas.current[index] = el;
              }}
              questionIndex={questionIndex}
            />
          ))}
        </div>
      </DragDropProvider>

      <Button
        variant="outline"
        className="h-12 w-full border-dashed text-muted-foreground hover:text-foreground"
        onClick={() => {
          append(createSingleSelectQuestion().content.options[0]);
        }}
      >
        <Plus className="mr-2 size-4" />
        Add another option
      </Button>
    </div>
  );
}
