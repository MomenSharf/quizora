"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { createDefaultOption } from "@/features/quiz-editor/create-defaults/questions/create-default-question";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { DragDropProvider } from "@dnd-kit/react";
import { useWatch } from "react-hook-form";

import { move } from "@dnd-kit/helpers";
import AnswerOption from "./answer-option";
import { IconPlus } from "@tabler/icons-react";
import { scrollElement } from "@/lib/utils/dom";

export function AnswerOptionsGroup({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { control, setValue } = useQuizForm();

  const question = useWatch({
    control,
    name: `questions.${questionIndex}`,
  });

  const options = useWatch({
    control,
    name: `questions.${questionIndex}.content.options`,
  });

  const moveOption = (from: number, to: number) => {
    if (!options) return;
    if (to < 0 || to >= options.length) return;

    const nextOptions = [...options];
    const [item] = nextOptions.splice(from, 1);
    nextOptions.splice(to, 0, item);

    setValue(`questions.${questionIndex}.content.options`, nextOptions, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
  };

  const textareas = useRef<(HTMLTextAreaElement | null)[]>([]);

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "44px";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 44)}px`;
  };

  
  return (
    <div className="space-y-3" ref={containerRef}>
      <DragDropProvider
        onDragEnd={(event) => {
          if (!options || event.canceled) return;

          const nextOptions = move(options, event);

          setValue(`questions.${questionIndex}.content.options`, nextOptions, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: false,
          });
        }}
      >
        <div className="space-y-3">
          {options.map((option, index) => {
            const canMoveUp = index > 0;
            const canMoveDown = index < options.length - 1;
            return (
              <AnswerOption
                key={option.id}
                optionId={option.id}
                index={index}
                type={question.type}
                questionIndex={questionIndex}
                autoResize={autoResize}
                textareaRef={(el) => {
                  textareas.current[index] = el;
                }}
                moveUp={() => moveOption(index, index - 1)}
                moveDown={() => moveOption(index, index + 1)}
                canMoveUp={canMoveUp}
                canMoveDown={canMoveDown}
              />
            );
          })}
        </div>
      </DragDropProvider>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full border-dashed text-muted-foreground hover:text-foreground"
        onClick={() => {
          setValue(
            `questions.${questionIndex}.content.options`,
            [...options, createDefaultOption("")],
            { shouldDirty: true },
          );
        }}
      >
        <IconPlus className="mr-2 size-4" />
        Add another option
      </Button>
    </div>
  );
}
