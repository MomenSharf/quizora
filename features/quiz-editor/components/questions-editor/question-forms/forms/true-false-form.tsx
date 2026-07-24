import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { cn } from "@/lib/utils";
import { useWatch } from "react-hook-form";

import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function TrueFalseForm({  questionIndex }: QuestionFormProps) {
  const { control, setValue } = useQuizForm();

  const correctAnswer = useWatch({
    control,
    name: `questions.${questionIndex}.content.correctAnswer`,
  });

  const options = [
    {
      id: "true",
      label: "True",
      value: true,
      color: "#22C55E",
      description: "True statement.",
    },
    {
      id: "false",
      label: "False",
      value: false,
      color: "#EF4444",
      description: "False statement.",
    },
  ];

  return (
    <div className="space-y-5">
      <SectionCard type="TRUE_FALSE" title="Question">
        <QuestionSection  questionIndex={questionIndex} type="TRUE_FALSE" />
      </SectionCard>

      <SectionCard type="TRUE_FALSE" title="Correct Answer">
        <div className="grid grid-cols-2 gap-4">
          {options.map((option) => {
            const active = option.value === correctAnswer;

            return (
              <Button
                key={option.id}
                type="button"
                variant="outline"
                aria-pressed={active}
                onClick={() =>
                  setValue(
                    `questions.${questionIndex}.content.correctAnswer`,
                    option.value,
                    { shouldDirty: true },
                  )
                }
                className={cn(
                  "group relative h-auto aspect-video p-2 flex-col items-center justify-center gap-3 rounded-xl border-2 transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg",
                  active && "ring-2 ring-primary ring-offset-2",
                )}
                style={{
                  borderColor: option.color,
                  backgroundColor: active
                    ? `${option.color}20`
                    : `${option.color}08`,
                  boxShadow: active
                    ? `0 0 0 2px ${option.color}, 0 0 0 6px hsl(var(--background))`
                    : undefined,
                }}
              >
                <CheckCircle2
                  className={cn(
                    "absolute right-4 top-4 size-5 transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                  style={{ color: option.color }}
                />

                <div className="relative">
                  <div
                    className="
                      absolute inset-0 rounded-full blur-xl opacity-0
                      scale-75 transition-all duration-300
                      group-hover:scale-125 group-hover:opacity-40
    "
                    style={{ backgroundColor: option.color }}
                  />

                  <div
                    className="
                    relative flex size-12 md:size-14 items-center justify-center rounded-full
                    text-xl font-bold
                    transition-all duration-300 ease-out
                    group-hover:-translate-y-1
                    group-hover:scale-110
                            "
                    style={{
                      backgroundColor: `${option.color}22`,
                      color: option.color,
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-125">
                      {option.label.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-semibold">{option.label}</h3>

                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </Button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard type="TRUE_FALSE" title="Explanation">
        <ExplanationSection  questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
