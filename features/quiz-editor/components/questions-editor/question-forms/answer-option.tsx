"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  IconCircle,
  IconCircleCheckFilled,
  IconDots,
  IconGripVertical,
  IconPhotoPlus,
  IconSquare,
  IconSquareCheckFilled,
} from "@tabler/icons-react";
import { useController, useWatch } from "react-hook-form";

export default function AnswerOption({
  optionId,
  index,
  autoResize,
  type,
  textareaRef,
  questionIndex,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
}: {
  optionId: string;
  index: number;
  type: QuestionType;
  autoResize: (textarea: HTMLTextAreaElement) => void;
  textareaRef: (el: HTMLTextAreaElement | null) => void;
  questionIndex: number;
  moveUp: () => void;
  moveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
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
            <IconGripVertical  className="size-5" />
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
            <IconPhotoPlus  className="size-5 text-muted-foreground" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto shrink-0 lg:ml-0 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
          >
            <IconDots className="size-5" />
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
            className="h-11 min-h-11 w-full overflow-y-auto scrollbar-thin bg-transparent text-sm leading-6 outline-none placeholder:text-muted-foreground"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="max-lg:hidden ml-auto shrink-0 lg:ml-0 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
        >
          <IconDots className="size-5" />
        </Button>
      </div>
    </div>
  );
}
