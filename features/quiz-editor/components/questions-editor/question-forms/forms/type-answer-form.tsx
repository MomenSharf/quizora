import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { useWatch } from "react-hook-form";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

import { createId } from "@paralleldrive/cuid2";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";
export function TypeAnswerForm({ question, questionIndex }: QuestionFormProps) {
  const { control, setValue } = useQuizForm();

  const expectedAnswers = useWatch({
    control,
    name: `questions.${questionIndex}.content.answers`,
  });

  const questionType = QUESTION_TYPES.find((item) => item.id === "TYPE_ANSWER");

  const color = questionType?.color;

  return (
    <div className="space-y-5">
      <SectionCard type="TYPE_ANSWER" title="Type Answer">
        <QuestionSection question={question} questionIndex={questionIndex} />
      </SectionCard>

      <SectionCard type="TYPE_ANSWER" title="Answer Content">
        <div className="space-y-3">
          {expectedAnswers.map(({ id, value }, index) => (
            <div
              key={id}
              className="group flex items-center gap-3 rounded-xl border bg-card p-3 transition-all hover:border-primary/30 hover:bg-accent/30"
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

              <Input
                value={value}
                placeholder={`Accepted answer ${index + 1}`}
                onChange={(e) =>
                  setValue(
                    `questions.${questionIndex}.content.answers.${index}.value`,
                    e.target.value,
                    { shouldDirty: true },
                  )
                }
                className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
              />

              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
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
        <ExplanationSection question={question} questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
