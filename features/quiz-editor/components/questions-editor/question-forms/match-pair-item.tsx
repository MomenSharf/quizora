"use client";

import { useRef, useState } from "react";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { MatchPair } from "@/features/quiz-editor/validation/question";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  IconArrowsLeftRight,
  IconGripVertical,
  IconPhotoPlus,
} from "@tabler/icons-react";
import { useController, useWatch } from "react-hook-form";
import { ActionsDropdown } from "./actions-dropdown";
import { createId } from "@paralleldrive/cuid2";

export default function MatchPairItem({
  pairId,
  pair,
  index,
  questionIndex,
  autoResize,
  textareaRef,
  rightTextareaRef,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
}: {
  pairId: string;
  pair: MatchPair;
  index: number;
  questionIndex: number;
  autoResize: (textarea: HTMLTextAreaElement) => void;
  textareaRef: (el: HTMLTextAreaElement | null) => void;
  rightTextareaRef: (el: HTMLTextAreaElement | null) => void;
  moveUp: () => void;
  moveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const color = QUESTION_TYPE_COLORS.MATCH;

  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);

  const { control, setValue } = useQuizForm();

  const pairs = useWatch({
    control,
    name: `questions.${questionIndex}.content.pairs`,
  });

  const { field: leftText } = useController({
    control,
    name: `questions.${questionIndex}.content.pairs.${index}.left.text`,
  });

  const { field: rightText } = useController({
    control,
    name: `questions.${questionIndex}.content.pairs.${index}.right.text`,
  });

  const { isDragging } = useSortable({
    id: pairId,
    index,
    element,
    handle: handleRef,
  });

  const onDelete = () => {
    if (questionIndex === -1 || !pairs) return;

    const nextPairs = pairs.filter((p) => p.id !== pair.id);

    setValue(`questions.${questionIndex}.content.pairs`, nextPairs, {
      shouldDirty: true,
    });
  };

  const onDuplicate = () => {
    if (questionIndex === -1 || !pairs) return;

    const pairIndex = pairs.findIndex((p) => p.id === pair.id);
    if (pairIndex === -1) return;

    const duplicatedPair = {
      ...pair,
      id: createId(),
    };

    const nextPairs = [...pairs];
    nextPairs.splice(pairIndex + 1, 0, duplicatedPair);

    setValue(`questions.${questionIndex}.content.pairs`, nextPairs, {
      shouldDirty: true,
    });
  };

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
        "group rounded-xl border bg-card p-3 transition-all",
        "hover:border-(--question-color) hover:shadow-sm",
        "focus-within:border-(--question-color) focus-within:ring-2 focus-within:ring-(--question-color)/20",
        isDragging &&
          "z-50 scale-[1.02] shadow-xl ring-2 ring-(--question-color)",
      )}
    >
      <div className="flex items-start gap-3">
        <button
          ref={handleRef}
          className="mt-1 cursor-grab rounded-md p-1 text-muted-foreground active:cursor-grabbing lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
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

        <div className="flex-1">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Left
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center rounded-lg border border-dashed bg-muted/40 transition-colors hover:bg-muted"
              >
                <IconPhotoPlus className="size-5 text-muted-foreground" />
              </button>

              <div className="rounded-lg border p-2">
                <textarea
                  {...leftText}
                  ref={(el) => {
                    leftText.ref(el);
                    textareaRef(el);

                    if (el) {
                      requestAnimationFrame(() => autoResize(el));
                    }
                  }}
                  onInput={(e) => autoResize(e.currentTarget)}
                  rows={1}
                  placeholder={`Left item ${index + 1}`}
                  className="h-11 min-h-11 w-full overflow-y-auto bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-center max-lg:py-2">
              <div
                className="flex size-11 items-center justify-center rounded-full border"
                style={{
                  borderColor: `${color}35`,
                  backgroundColor: `${color}12`,
                  color,
                }}
              >
                <IconArrowsLeftRight className="size-5" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Right
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center rounded-lg border border-dashed bg-muted/40 transition-colors hover:bg-muted"
              >
                <IconPhotoPlus className="size-5 text-muted-foreground" />
              </button>

              <div className="rounded-lg border p-2">
                <textarea
                  {...rightText}
                  ref={(el) => {
                    rightText.ref(el);
                    rightTextareaRef(el);

                    if (el) {
                      requestAnimationFrame(() => autoResize(el));
                    }
                  }}
                  onInput={(e) => autoResize(e.currentTarget)}
                  rows={1}
                  placeholder={`Right item ${index + 1}`}
                  className="h-11 min-h-11 w-full overflow-y-auto bg-transparent text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden shrink-0 lg:block lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
          <ActionsDropdown
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            canDelete={pairs.length > 1}
            canMoveDown={canMoveDown}
            canMoveUp={canMoveUp}
            moveDown={moveDown}
            moveUp={moveUp}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end lg:hidden">
        <ActionsDropdown
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          canDelete={pairs.length > 1}
          canMoveDown={canMoveDown}
          canMoveUp={canMoveUp}
          moveDown={moveDown}
          moveUp={moveUp}
        />
      </div>
    </div>
  );
}
