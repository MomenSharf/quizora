import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { useController, useWatch } from "react-hook-form";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { AcceptedAnswer } from "@/features/quiz-editor/validation/question";
import { createId } from "@paralleldrive/cuid2";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";

function AnswerInput({
  id,
  questionIndex,
  index,
  expectedAnswers,
  color,
  textareaRef,
  autoResize,
}: {
  id: string;
  questionIndex: number;
  index: number;
  expectedAnswers: AcceptedAnswer[];
  color: string | undefined;
  textareaRef: (el: HTMLTextAreaElement | null) => void;
  autoResize: (textarea: HTMLTextAreaElement) => void;
}) {
  const { control, setValue } = useQuizForm();

  const { field: textField } = useController({
    control,
    name: `questions.${questionIndex}.content.options.${index}.text`,
  });

  return (
    <div
      className="group flex items-center gap-3 rounded-xl border bg-card p-3  hover:border-(--question-color) hover:shadow-sm focus-within:border-(--question-color) focus-within:ring-2 focus-within:ring-(--question-color)/20"
      style={
        {
          "--question-color": color,
        } as React.CSSProperties
      }
    >
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
          placeholder={`Accepted answer ${index + 1}`}
          className="h-11 min-h-11 w-full overflow-y-auto scrollbar-thin bg-transparent text-sm leading-6 outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle2 className="size-5 text-emerald-500" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-destructive/10 hover:text-destructive"
          disabled={expectedAnswers.length === 1}
          onClick={() => {
            const nweExpectedAnswers = expectedAnswers.filter(
              (e) => e.id === id,
            );
            setValue(
              `questions.${questionIndex}.content.answers`,
              nweExpectedAnswers,
              { shouldDirty: true },
            );
          }}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function TypeAnswerForm({  questionIndex }: QuestionFormProps) {
  const { control, setValue } = useQuizForm();

  const expectedAnswers = useWatch({
    control,
    name: `questions.${questionIndex}.content.answers`,
  });

  const textareas = useRef<(HTMLTextAreaElement | null)[]>([]);

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "44px";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 44)}px`;
  };

   const color = QUESTION_TYPE_COLORS['TYPE_ANSWER'];

  return (
    <div className="space-y-5">
      <SectionCard type="TYPE_ANSWER" title="Type Answer">
        <QuestionSection  questionIndex={questionIndex} />
      </SectionCard>

      <SectionCard type="TYPE_ANSWER" title="Answer Content">
        <div className="space-y-3">
          {expectedAnswers.map(({ id }, index) => (
            <AnswerInput
              key={id}
              id={id}
              questionIndex={questionIndex}
              index={index}
              expectedAnswers={expectedAnswers}
              color={color}
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
                [...expectedAnswers, { id: createId(), value: "" }],
                { shouldDirty: true },
              );
            }}
          >
            <Plus className="mr-2 size-4" />
            Add Accepted Answer
          </Button>
        </div>
      </SectionCard>
      <SectionCard type="TYPE_ANSWER" title="Explanation">
        <ExplanationSection  questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
