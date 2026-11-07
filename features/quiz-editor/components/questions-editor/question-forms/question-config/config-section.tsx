"use client";

import { Clock3, Star } from "lucide-react";

import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { cn } from "@/lib/utils";
import { SelectField } from "./select-field";

interface ConfigSectionProps {
  questionIndex: number;
  className?: string;
}

export function ConfigSection({
  questionIndex,
  className,
}: ConfigSectionProps) {
  const { control } = useQuizForm();

  return (
    <section
      className={cn(
        "rounded-xl border border-border/60 bg-muted/20 p-3",
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="min-w-0">
          <SelectField
            control={control}
            name={`questions.${questionIndex}.points`}
            label={
              <span className="flex items-center gap-1.5">
                <Star className="size-3.5 text-amber-500" />
                Points
              </span>
            }
            description="Earned for a correct answer."
            options={[
              { label: "1 Point", value: 1 },
              { label: "2 Points", value: 2 },
              { label: "3 Points", value: 3 },
              { label: "4 Points", value: 4 },
              { label: "5 Points", value: 5 },
              { label: "6 Points", value: 6 },
              { label: "8 Points", value: 8 },
              { label: "10 Points", value: 10 },
              { label: "12 Points", value: 12 },
              { label: "15 Points", value: 15 },
              { label: "20 Points", value: 20 },
              { label: "25 Points", value: 25 },
              { label: "30 Points", value: 30 },
              { label: "40 Points", value: 40 },
              { label: "50 Points", value: 50 },
              { label: "60 Points", value: 60 },
              { label: "75 Points", value: 75 },
              { label: "100 Points", value: 100 },
              { label: "150 Points", value: 150 },
              { label: "200 Points", value: 200 },
              { label: "250 Points", value: 250 },
              { label: "500 Points", value: 500 },
              { label: "1000 Points", value: 1000 },
            ]}
          />
        </div>

        <div className="min-w-0">
          <SelectField
            control={control}
            name={`questions.${questionIndex}.timeLimitSeconds`}
            label={
              <span className="flex items-center gap-1.5">
                <Clock3 className="size-3.5 text-blue-500" />
                Time limit
              </span>
            }
            description="Time to answer this question."
            options={[
              { label: "5 seconds", value: 5 },
              { label: "10 seconds", value: 10 },
              { label: "15 seconds", value: 15 },
              { label: "20 seconds", value: 20 },
              { label: "30 seconds", value: 30 },
              { label: "45 seconds", value: 45 },

              { label: "1 minute", value: 60 },
              { label: "1.5 minutes", value: 90 },
              { label: "2 minutes", value: 120 },
              { label: "2.5 minutes", value: 150 },
              { label: "3 minutes", value: 180 },
              { label: "4 minutes", value: 240 },
              { label: "5 minutes", value: 300 },

              { label: "6 minutes", value: 360 },
              { label: "7 minutes", value: 420 },
              { label: "8 minutes", value: 480 },
              { label: "10 minutes", value: 600 },
              { label: "12 minutes", value: 720 },
              { label: "15 minutes", value: 900 },
              { label: "20 minutes", value: 1200 },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
