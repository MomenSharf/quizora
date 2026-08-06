import { Input } from "@/components/ui/input";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import {
  IconArrowBadgeRight,
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

  const minValue = Number(min.field.value ?? 0);
  const maxValue = Number(max.field.value ?? 10);
  const stepValue = Math.max(1, Number(step.field.value ?? 1));

  const isRangeValid = maxValue > minValue;

  const acceptedMin = Number(answerMin.field.value ?? minValue);
  const acceptedMax = Number(answerMax.field.value ?? maxValue);

  const isAcceptedRangeValid = acceptedMax > acceptedMin;

  const isAcceptedRangeValidAndIsRangeValid =
    isRangeValid && isAcceptedRangeValid;

  const ticks = [];

  if (isAcceptedRangeValidAndIsRangeValid) {
    for (let value = minValue; value <= maxValue; value += stepValue) {
      ticks.push({
        value,
        active: value >= acceptedMin && value <= acceptedMax,
      });
    }

    if (ticks.at(-1)?.value !== maxValue) {
      ticks.push({
        value: maxValue,
        active: maxValue >= acceptedMin && maxValue <= acceptedMax,
      });
    }
  }

  const selectTick = (value: number) => {
    const start = Number(answerMin.field.value ?? minValue);
    const end = Number(answerMax.field.value ?? maxValue);

    if (value < start) {
      answerMin.field.onChange(value);
      return;
    }

    if (value > end) {
      answerMax.field.onChange(value);
      return;
    }

    const middle = (start + end) / 2;

    if (value <= middle) {
      answerMin.field.onChange(value);
    } else {
      answerMax.field.onChange(value);
    }
  };

  return (
   <div
      className="space-y-5"
      style={
        {
          "--primary": 'var(--question-range)',
        } as React.CSSProperties
      }
    >
      <SectionCard type="RANGE" title="Range">
        <QuestionSection questionIndex={questionIndex} type="RANGE" />
      </SectionCard>
      <SectionCard type="RANGE" title="">
        <div className="space-y-4">
          <div className="rounded-2xl border p-5 border-primary/30">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <IconRulerMeasure size={18} />
              </div>

              <div>
                <p className="font-semibold">Scale</p>
                <p className="text-xs text-muted-foreground">
                  Configure the available values.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <RangeNumberInput label="Minimum" field={min.field} />

              <RangeNumberInput label="Maximum" field={max.field} />

              <RangeNumberInput label="Interval" field={step.field} />
            </div>

            <div className="mt-4">
              <Input
                {...unit.field}
                placeholder="Unit (kg, cm, %, pts...)"
                className="h-10 border-primary"
              />
            </div>
          </div>

          <div
            className="rounded-2xl border p-5 border-primary/30"
            
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <IconTargetArrow size={18} />
              </div>

              <div>
                <p className="font-semibold">Accepted Answer</p>
                <p className="text-xs text-muted-foreground">
                  Select the correct answer range.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <RangeNumberInput label="Accept From" field={answerMin.field} />

              <RangeNumberInput label="Accept To" field={answerMax.field} />
            </div>
          </div>
          <div className="rounded-2xl border p-5 border-primary/30">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <IconScale size={18} />
                </div>

                <div>
                  <p className="font-semibold">Interactive Preview</p>
                  <p className="text-xs text-muted-foreground">
                    Click the scale to quickly adjust the accepted range.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-primary/15 text-primary">
                <span>
                  {acceptedMin}
                  {unit.field.value ? ` ${unit.field.value}` : ""}
                </span>

                <IconArrowBadgeRight size={14} />

                <span>
                  {acceptedMax}
                  {unit.field.value ? ` ${unit.field.value}` : ""}
                </span>
              </div>
            </div>

            {!isAcceptedRangeValidAndIsRangeValid ? (
              <div className="flex h-40 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5">
                <p className="text-sm font-medium text-destructive">
                  Maximum value must be greater than minimum value.
                </p>
              </div>
            ) : (
              <div className="overflow-y-auto scrollbar-thin rounded-xl border p-4 border-primary/25">
                <div className="flex h-36 items-end">
                  {ticks.map((tick, index) => {
                    const isFirst = index === 0;
                    const isMiddle =
                      index === Math.floor((ticks.length - 1) / 2);
                    const isLast = index === ticks.length - 1;

                    const showLabel = isFirst || isMiddle || isLast;

                    return (
                      <button
                        key={tick.value}
                        type="button"
                        onClick={() => selectTick(tick.value)}
                        className="group flex flex-1 flex-col items-center justify-end rounded-md py-2 transition-colors hover:bg-muted/40"
                      >
                        {showLabel && (
                          <span className="mb-2 text-[10px] font-semibold text-primary">
                            {tick.value}
                          </span>
                        )}

                        <div
                          className="flex w-full justify-center"
                          title={String(tick.value)}
                        >
                          <div
                            className="w-0.75 rounded-full transition-all duration-200 group-hover:scale-y-110"
                            style={{
                              height: showLabel
                                ? 78
                                : index % 2 === 0
                                  ? 56
                                  : 40,

                              backgroundColor: tick.active
                                ? "var(--primary)"
                                : "var(--muted-foreground)",

                              opacity: tick.active ? 1 : 0.25,

                              boxShadow: tick.active
                                ? `0 0 10px var(--primary)66`
                                : undefined,
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{minValue}</span>

                  <span>
                    Step {stepValue}
                    {unit.field.value ? ` ${unit.field.value}` : ""}
                  </span>

                  <span>{maxValue}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard type="RANGE" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
