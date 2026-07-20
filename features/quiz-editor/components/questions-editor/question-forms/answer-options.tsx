"use client";

import { GripVertical, ImagePlus, MoreHorizontal, Plus } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { createDefaultOption } from "@/features/quiz-editor/create-defaults/questions/create-default-question";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  IconCircle,
  IconCircleCheckFilled,
  IconSquare,
  IconSquareCheckFilled,
} from "@tabler/icons-react";
import { useController, useFieldArray, useWatch } from "react-hook-form";

function SortableAnswerOption({
  optionId,
  index,
  autoResize,
  type,
  textareaRef,
  questionIndex,
}: {
  optionId: string;
  index: number;
  type: QuestionType;
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

  const singleCorrect = useWatch({
    control,
    name: `questions.${questionIndex}.content.correctOptionId`,
  });

  const multipleCorrect = useWatch({
    control,
    name: `questions.${questionIndex}.content.correctOptionIds`,
  });

  const { isDragging } = useSortable({
    id: optionId,
    index,
    element,
    handle: handleRef,
  });

  const isCorrect =
    type === QuestionType.SINGLE_SELECT
      ? singleCorrect === optionId
      : type === QuestionType.MULTIPLE_SELECT
        ? multipleCorrect.includes(optionId)
        : false;

  const toggleCorrect = () => {
    if (type === QuestionType.SINGLE_SELECT) {
      setValue(
        `questions.${questionIndex}.content.correctOptionId`,
        isCorrect ? "" : optionId,
        {
          shouldDirty: true,
        },
      );

      return;
    }

    if (type === QuestionType.MULTIPLE_SELECT) {
      const next = isCorrect
        ? multipleCorrect.filter((id) => id !== optionId)
        : [...multipleCorrect, optionId];

      setValue(`questions.${questionIndex}.content.correctOptionIds`, next, {
        shouldDirty: true,
      });
    }
  };

  return (
    <div
      ref={setElement}
      className={cn(
        "group rounded-xl border bg-card p-3 transition-all",
        "hover:border-primary/30 hover:shadow-sm",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        isDragging && "z-50 scale-[1.02] shadow-xl ring-2 ring-primary",
      )}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <div className="flex items-center gap-2 lg:gap-3 max-lg:w-full">
          <button
            ref={handleRef}
            className="cursor-grab rounded-md p-1 text-muted-foreground active:cursor-grabbing lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <GripVertical className="size-5" />
          </button>

          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {index + 1}
          </div>

          {type !== QuestionType.ORDERING && (
            <button
              type="button"
              onClick={toggleCorrect}
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-primary active:scale-95"
            >
              {type === QuestionType.MULTIPLE_SELECT ? (
                isCorrect ? (
                  <IconSquareCheckFilled className="size-6 text-primary" />
                ) : (
                  <IconSquare className="size-6" />
                )
              ) : isCorrect ? (
                <IconCircleCheckFilled className="size-6 text-primary" />
              ) : (
                <IconCircle className="size-6" />
              )}
            </button>
          )}

          <button className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-dashed bg-muted/40 transition-colors hover:bg-muted lg:size-14">
            <ImagePlus className="size-5 text-muted-foreground" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto shrink-0 lg:ml-0 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
          >
            <MoreHorizontal className="size-5" />
          </Button>
        </div>

        <div className="w-full rounded-lg border p-2">
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
            className="min-h-11 w-full resize-none overflow-hidden bg-transparent text-sm leading-6 outline-none placeholder:text-muted-foreground md:text-base"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="max-lg:hidden ml-auto shrink-0 lg:ml-0 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
        >
          <MoreHorizontal className="size-5" />
        </Button>
      </div>
    </div>
  );
}

export function AnswerOptions({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const { control } = useQuizForm();

  const question = useWatch({
    control,
    name: `questions.${questionIndex}`,
  });

  const type = question.type;

  const { fields, append, move } = useFieldArray({
    control,
    name: `questions.${questionIndex}.content.options`,
    keyName: "fieldKey",
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

          if (sourceIndex !== -1 && targetIndex !== -1) {
            move(sourceIndex, targetIndex);
          }
        }}
      >
        <div className="space-y-3">
          {fields.map((field, index) => (
            <SortableAnswerOption
              key={field.fieldKey}
              optionId={field.id}
              index={index}
              type={type}
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
          append(createDefaultOption(`Option ${fields.length + 1}`));
        }}
      >
        <Plus className="mr-2 size-4" />
        Add another option
      </Button>
    </div>
  );
}