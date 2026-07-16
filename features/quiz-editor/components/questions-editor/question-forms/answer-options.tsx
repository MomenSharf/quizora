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
import { createDefaultOption } from "@/features/quiz-editor/create-defaults/questions/create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import {
  IconCheckbox,
  IconCheckFilled,
  IconCircle,
  IconCircleCheckFilled,
  IconSquare,
  IconSquareCheckFilled,
} from "@tabler/icons-react";

function SortableAnswerOption({
  fieldId,
  index,
  autoResize,
  type,
  textareaRef,
  questionIndex,
}: {
  fieldId: string;
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
    id: fieldId,
    index,
    element,
    handle: handleRef,
  });

  const isCorrect =
    type === QuestionType.SINGLE_SELECT
      ? singleCorrect === fieldId
      : type === QuestionType.MULTIPLE_SELECT
        ? multipleCorrect.includes(fieldId)
        : false;

  const toggleCorrect = () => {
    if (type === QuestionType.SINGLE_SELECT) {
      setValue(
        `questions.${questionIndex}.content.correctOptionId`,
        isCorrect ? "" : fieldId,
        {
          shouldDirty: true,
        },
      );

      return;
    }

    if (type === QuestionType.MULTIPLE_SELECT) {
      const next = isCorrect
        ? multipleCorrect.filter((id) => id !== fieldId)
        : [...multipleCorrect, fieldId];

      setValue(`questions.${questionIndex}.content.correctOptionIds`, next, {
        shouldDirty: true,
      });
    }
  };
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
      {type !== QuestionType.ORDERING && (
        <button
          type="button"
          onClick={toggleCorrect}
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md border transition-all duration-200 mt-1",
            isCorrect
              ? "border-primary bg-primary/10 text-primary shadow-sm"
              : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-accent",
          )}
        >
          {type === QuestionType.MULTIPLE_SELECT ? (
            isCorrect ? (
              <IconSquareCheckFilled className="size-5" />
            ) : (
              <IconSquare className="size-5" />
            )
          ) : isCorrect ? (
            <IconCircleCheckFilled className="size-5" />
          ) : (
            <IconCircle className="size-5" />
          )}
        </button>
      )}
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

export function AnswerOptions({ questionIndex }: { questionIndex: number }) {
  const { control } = useQuizForm();

  const question = useWatch({
    control,
    name: `questions.${questionIndex}`,
  });

  const type = question.type;

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
