"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { IconPlus } from "@tabler/icons-react";
import { useWatch } from "react-hook-form";
import MatchPairItem from "./match-pair-item";
import { createDefaultQuestion } from "@/features/quiz-editor/create-defaults/questions/create-default-question";
import { createMatchQuestion } from "@/features/quiz-editor/create-defaults/questions/match-question";

export function MatchPairsGroup({ questionIndex }: { questionIndex: number }) {
  const { control, setValue } = useQuizForm();

  const pairs = useWatch({
    control,
    name: `questions.${questionIndex}.content.pairs`,
  });

  const textareas = useRef<(HTMLTextAreaElement | null)[]>([]);

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "44px";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 44)}px`;
  };

  const movePair = (from: number, to: number) => {
    if (!pairs) return;
    if (to < 0 || to >= pairs.length) return;

    const next = [...pairs];
    const [item] = next.splice(from, 1);

    next.splice(to, 0, item);

    setValue(`questions.${questionIndex}.content.pairs`, next, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="space-y-3">
      <DragDropProvider
        onDragEnd={(event) => {
          if (!pairs || event.canceled) return;

          const next = move(pairs, event);

          setValue(`questions.${questionIndex}.content.pairs`, next, {
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
      >
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <MatchPairItem
              key={pair.id}
              pairId={pair.id}
              pair={pair}
              index={index}
              questionIndex={questionIndex}
              autoResize={autoResize}
              textareaRef={(el) => {
                textareas.current[index * 2] = el;
              }}
              rightTextareaRef={(el) => {
                textareas.current[index * 2 + 1] = el;
              }}
              moveUp={() => movePair(index, index - 1)}
              moveDown={() => movePair(index, index + 1)}
              canMoveUp={index > 0}
              canMoveDown={index < pairs.length - 1}
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
            `questions.${questionIndex}.content.pairs`,
            [...pairs, createMatchQuestion().content.pairs[0]],
            {
              shouldDirty: true,
            },
          );
        }}
      >
        <IconPlus className="mr-2 size-4" />
        Add another pair
      </Button>
    </div>
  );
}
