"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { createId } from "@paralleldrive/cuid2";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { IconPlus } from "@tabler/icons-react";
import { useWatch } from "react-hook-form";

import Hint from "./hint";

export default function HintsGroup({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const { control, setValue } = useQuizForm();

  const hints = useWatch({
    control,
    name: `questions.${questionIndex}.content.hints`,
  });

  const textareas = useRef<(HTMLTextAreaElement | null)[]>([]);

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "44px";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 44)}px`;
  };

  const moveHint = (from: number, to: number) => {
    if (!hints) return;
    if (to < 0 || to >= hints.length) return;

    const next = [...hints];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);

    setValue(`questions.${questionIndex}.content.hints`, next, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="space-y-3">
      <DragDropProvider
        onDragEnd={(event) => {
          if (!hints || event.canceled) return;

          const next = move(hints, event);

          setValue(`questions.${questionIndex}.content.hints`, next, {
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
      >
        <div className="space-y-3">
          {hints.map((hint, index) => (
            <Hint
              key={hint.id}
              hintId={hint.id}
              hints={hints}
              index={index}
              questionIndex={questionIndex}
              textareaRef={(el) => {
                textareas.current[index] = el;
              }}
              autoResize={autoResize}
              moveUp={() => moveHint(index, index - 1)}
              moveDown={() => moveHint(index, index + 1)}
              canMoveUp={index > 0}
              canMoveDown={index < hints.length - 1}
            />
          ))}
        </div>
      </DragDropProvider>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full border-dashed text-muted-foreground hover:text-foreground"
        onClick={() => {
          setValue(
            `questions.${questionIndex}.content.hints`,
            [
              ...hints,
              {
                id: createId(),
                value: "",
              },
            ],
            {
              shouldDirty: true,
            },
          );
        }}
      >
        <IconPlus className="mr-2 size-4" />
        Add Hint
      </Button>
    </div>
  );
}