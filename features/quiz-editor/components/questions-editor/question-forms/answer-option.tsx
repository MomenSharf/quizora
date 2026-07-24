"use client";

import { useRef, useState } from "react";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  IconCircle,
  IconCircleCheckFilled,
  IconGripVertical,
  IconPhotoPlus,
  IconSquare,
  IconSquareCheckFilled
} from "@tabler/icons-react";
import { useController, useWatch } from "react-hook-form";
import { AnswerOptionActionsDropdown } from "./answer-option-actions-dropdown";

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
    type === QuestionType.SINGLE_SELECT || type === QuestionType.DROPDOWN
      ? singleCorrect === optionId
      : type === QuestionType.MULTIPLE_SELECT
        ? multipleCorrect.includes(optionId)
        : false;

  const placeholder =
    type === QuestionType.ORDERING
      ? `Item ${index + 1}`
      : type === QuestionType.DROPDOWN
        ? `Option ${index + 1}`
        : `Answer ${index + 1}`;

  const toggleCorrect = () => {
    if (type === QuestionType.SINGLE_SELECT || type === QuestionType.DROPDOWN) {
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

   const color = QUESTION_TYPE_COLORS[type];

  return (
    <div
      ref={setElement}
      style={
        {
          "--question-color": color,
          touchAction: "none",
        } as React.CSSProperties
      }
      className={cn(
        "touch-none group rounded-xl border bg-card p-3 transition-all",
        "hover:border-(--question-color) hover:shadow-sm",
        "focus-within:border-(--question-color) focus-within:ring-2 focus-within:ring-(--question-color)/20",
        isDragging &&
          "z-50 scale-[1.02] shadow-xl ring-2 ring-(--question-color)",
      )}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-start">
        <div className="flex items-center gap-2 lg:gap-3 max-lg:w-full">
          <button
            ref={handleRef}
            className="cursor-grab rounded-md p-1 text-muted-foreground active:cursor-grabbing lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <IconGripVertical className="size-5" />
          </button>

          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
            style={{
              borderColor: `${color}40`,
              backgroundColor: `${color}18`,
              color,
            }}
          >
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
                  <IconSquareCheckFilled className="size-6" style={{ color }} />
                ) : (
                  <IconSquare
                    className="size-6"
                    style={{ color: `${color}80` }}
                  />
                )
              ) : isCorrect ? (
                <IconCircleCheckFilled className="size-6" style={{ color }} />
              ) : (
                <IconCircle
                  className="size-6"
                  style={{ color: `${color}80` }}
                />
              )}
            </button>
          )}

          <button className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-dashed bg-muted/40 transition-colors hover:bg-muted lg:size-14">
            <IconPhotoPlus className="size-5 text-muted-foreground" />
          </button>

          <div className="lg:hidden ml-auto shrink-0 lg:ml-0 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
            <AnswerOptionActionsDropdown
              questionIndex={questionIndex}
              optionId={optionId}
              canMoveDown={canMoveDown}
              canMoveUp={canMoveUp}
              moveDown={moveDown}
              moveUp={moveUp}
            />
          </div>
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
            placeholder={placeholder}
            className="h-11 min-h-11 w-full overflow-y-auto scrollbar-thin bg-transparent text-sm leading-6 outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-lg:hidden  ml-auto shrink-0 lg:ml-0 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
          <AnswerOptionActionsDropdown
            questionIndex={questionIndex}
            optionId={optionId}
            canMoveDown={canMoveDown}
            canMoveUp={canMoveUp}
            moveDown={moveDown}
            moveUp={moveUp}
          />
        </div>
      </div>
    </div>
  );
}
