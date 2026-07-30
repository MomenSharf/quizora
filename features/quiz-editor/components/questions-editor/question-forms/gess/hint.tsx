"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { GuessHint } from "@/features/quiz-editor/validation/question";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  IconBulbFilled,
  IconGripVertical,
} from "@tabler/icons-react";
import { useController, useWatch } from "react-hook-form";
import { createId } from "@paralleldrive/cuid2";
import { ActionsDropdown } from "../../actions-dropdown";

export default function Hint({
  hintId,
  hints,
  index,
  questionIndex,
  textareaRef,
  autoResize,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
}: {
  hintId: string;
  hints: GuessHint[];
  index: number;
  questionIndex: number;
  textareaRef: (el: HTMLTextAreaElement | null) => void;
  autoResize: (textarea: HTMLTextAreaElement) => void;
  moveUp: () => void;
  moveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);

  const { control, setValue } = useQuizForm();

  const { field } = useController({
    control,
    name: `questions.${questionIndex}.content.hints.${index}.value`,
  });

  const hint = useWatch({
    control,
    name: `questions.${questionIndex}.content.hints.${index}`,
  });

  const { isDragging } = useSortable({
    id: hintId,
    index,
    element,
    handle: handleRef,
  });

  const onDelete = () => {
    if (!hint) return;

    const next = hints.filter((h) => h.id !== hint.id);

    setValue(`questions.${questionIndex}.content.hints`, next, {
      shouldDirty: true,
    });
  };

  const onDuplicate = () => {
    if (!hint) return;

    const i = hints.findIndex((h) => h.id === hint.id);

    if (i === -1) return;

    const next = [...hints];

    next.splice(i + 1, 0, {
      id: createId(),
      value: hint.value,
    });

    setValue(`questions.${questionIndex}.content.hints`, next, {
      shouldDirty: true,
    });
  };

  return (
    <div
      ref={setElement}
      className={cn(
        "group rounded-xl border bg-card p-3 transition-all touch-none",
        "hover:border-primary hover:shadow-sm",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        isDragging && "z-50 scale-[1.02] shadow-xl ring-2 ring-primary",
      )}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-start">
        <div className="flex items-center gap-2 lg:gap-3 max-lg:w-full">
          <button
            ref={handleRef}
            className="cursor-grab rounded-md p-1 text-muted-foreground active:cursor-grabbing lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <IconGripVertical className="size-5" />
          </button>

          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-sm font-semibold text-primary">
            {index + 1}
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconBulbFilled className="size-5" />
          </div>

          <div className="lg:hidden ml-auto">
            <ActionsDropdown
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              canDelete={hints.length > 1}
              moveUp={moveUp}
              moveDown={moveDown}
              canMoveUp={canMoveUp}
              canMoveDown={canMoveDown}
            />
          </div>
        </div>

        <div className="w-full rounded-lg border p-2">
          <textarea
            {...field}
            rows={1}
            placeholder={`Hint ${index + 1}`}
            className="h-11 min-h-11 w-full resize-none overflow-y-auto bg-transparent text-sm leading-6 outline-none placeholder:text-muted-foreground"
            ref={(el) => {
              field.ref(el);
              textareaRef(el);

              if (el) {
                requestAnimationFrame(() => autoResize(el));
              }
            }}
            onInput={(e) => autoResize(e.currentTarget)}
          />
        </div>

        <div className="hidden shrink-0 lg:block lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <ActionsDropdown
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            canDelete={hints.length > 1}
            moveUp={moveUp}
            moveDown={moveDown}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          />
        </div>
      </div>
    </div>
  );
}