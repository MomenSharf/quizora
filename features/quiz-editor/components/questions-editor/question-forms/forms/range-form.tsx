import { Input } from "@/components/ui/input";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import {
  IconArrowsHorizontal,
  IconArrowsLeftRight,
  IconRulerMeasure,
  IconScale,
  IconTargetArrow,
} from "@tabler/icons-react";
import { useController } from "react-hook-form";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { RangeNumberInput } from "../range-number-input";
import { SectionCard } from "../section-card";
import { Slider } from "@/components/ui/slider";
import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";

export function RangeForm({ questionIndex }: QuestionFormProps) {
  const { control } = useQuizForm();

  const min = useController({
    control,
    name: `questions.${questionIndex}.content.min`,
  });

  const max = useController({
    control,
    name: `questions.${questionIndex}.content.max`,
  });

  const step = useController({
    control,
    name: `questions.${questionIndex}.content.step`,
  });

  const unit = useController({
    control,
    name: `questions.${questionIndex}.content.unit`,
  });

  const answerMin = useController({
    control,
    name: `questions.${questionIndex}.content.answer.min`,
  });

  const answerMax = useController({
    control,
    name: `questions.${questionIndex}.content.answer.max`,
  });

  const color = QUESTION_TYPE_COLORS["RANGE"];

  return (
    <div className="space-y-5">
      <SectionCard type="RANGE" title="Range">
        <QuestionSection questionIndex={questionIndex} type="RANGE" />
      </SectionCard>

      <SectionCard type="RANGE" title="Range Settings">
        <div className="space-y-4">
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: `${color}30`,
            }}
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <div
                className="size-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}18`, color }}
              >
                <IconArrowsLeftRight size={16} />
              </div>
              Range
            </div>

            <div className="grid gap-3 grid-cols-3">
              <RangeNumberInput
                label="Min"
                icon={<IconArrowsHorizontal size={14} />}
                field={min.field}
                color={color}
              />

              <RangeNumberInput
                label="Max"
                icon={<IconArrowsHorizontal size={14} />}
                field={max.field}
                color={color}
              />

              <RangeNumberInput
                label="Step"
                icon={<IconScale size={14} />}
                field={step.field}
                color={color}
              />
            </div>

            <div className="mt-3">
              <Input
                placeholder="Unit (kg, %, cm...)"
                {...unit.field}
                className="h-9 rounded-lg bg-background"
                style={
                  color
                    ? ({
                        "--tw-ring-color": color,
                        borderColor: `${color}30`,
                      } as React.CSSProperties)
                    : undefined
                }
              />
            </div>
          </div>

          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: `${color}30`,
            }}
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <div
                className="size-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}18`, color }}
              >
                <IconTargetArrow size={16} />
              </div>
              Correct Range
            </div>

            <div className="grid gap-3 grid-cols-2">
              <RangeNumberInput
                label="From"
                field={answerMin.field}
                color={color}
              />

              <RangeNumberInput
                label="To"
                field={answerMax.field}
                color={color}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard type="RANGE" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
