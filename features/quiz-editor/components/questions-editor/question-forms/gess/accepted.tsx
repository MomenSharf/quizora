"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { AcceptedAnswer } from "@/features/quiz-editor/validation/question";
import { createId } from "@paralleldrive/cuid2";
import {
  IconPlus,
  IconTargetArrow,
  IconTrash,
} from "@tabler/icons-react";
import { useController, useWatch } from "react-hook-form";

function AcceptedAnswerItem({
  id,
  questionIndex,
  index,
  answers,
  textareaRef,
  autoResize,
}: {
  id: string;
  questionIndex: number;
  index: number;
  answers: AcceptedAnswer[];
  textareaRef: (el: HTMLTextAreaElement | null) => void;
  autoResize: (textarea: HTMLTextAreaElement) => void;
}) {
  const { control, setValue } = useQuizForm();

  const { field } = useController({
    control,
    name: `questions.${questionIndex}.content.answers.${index}.value`,
  });

  return (
    <div className="group flex items-start gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary hover:shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-sm font-semibold text-primary">
        {index + 1}
      </div>

      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <IconTargetArrow className="size-5" />
      </div>

      <div className="w-full rounded-lg border p-2">
        <textarea
          {...field}
          rows={1}
          placeholder={`Accepted answer ${index + 1}`}
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

      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={answers.length === 1}
        className="shrink-0 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        onClick={() => {
          setValue(
            `questions.${questionIndex}.content.answers`,
            answers.filter((answer) => answer.id !== id),
            {
              shouldDirty: true,
            },
          );
        }}
      >
        <IconTrash className="size-4" />
      </Button>
    </div>
  );
}

export default function Accepted({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const { control, setValue } = useQuizForm();

  const answers = useWatch({
    control,
    name: `questions.${questionIndex}.content.answers`,
  });

  const textareas = useRef<(HTMLTextAreaElement | null)[]>([]);

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "44px";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 44)}px`;
  };

  return (
    <div className="space-y-3">
      {answers.map((answer, index) => (
        <AcceptedAnswerItem
          key={answer.id}
          id={answer.id}
          questionIndex={questionIndex}
          index={index}
          answers={answers}
          textareaRef={(el) => {
            textareas.current[index] = el;
          }}
          autoResize={autoResize}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full border-dashed text-muted-foreground hover:text-foreground"
        onClick={() => {
          setValue(
            `questions.${questionIndex}.content.answers`,
            [
              ...answers,
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
        Add Accepted Answer
      </Button>
    </div>
  );
}