
import { IconCheck, IconX, IconInfoCircle } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export interface TrueFalseQuestionData {
  correctAnswer: boolean;
  explanation?: string | null;
}

export function TrueFalseQuestion({
  data,
  showAnswers,
}: {
  data: TrueFalseQuestionData;
  showAnswers: boolean;
}) {
  const options = [
    { value: true, label: "True" },
    { value: false, label: "False" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const correct = data.correctAnswer === option.value;

          return (
            <div
              key={option.label}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl border p-5 text-sm font-semibold",
                showAnswers && correct
                  ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-600"
                  : "bg-card text-muted-foreground",
              )}
            >
              {showAnswers && correct ? (
                <IconCheck className="size-4" />
              ) : (
                <span className="size-2 rounded-full bg-current opacity-30" />
              )}
              {option.label}
            </div>
          );
        })}
      </div>

      {showAnswers && data.explanation && (
        <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <IconInfoCircle className="size-4 text-primary" />
            Explanation
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{data.explanation}</p>
        </div>
      )}
    </div>
  );
}
