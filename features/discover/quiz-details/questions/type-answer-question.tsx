
import { IconCheck, IconTextSize } from "@tabler/icons-react";

export interface TypeAnswerQuestionData {
  acceptedAnswers: string[];
  caseSensitive?: boolean;
  explanation?: string | null;
}

export function TypeAnswerQuestion({
  data,
  showAnswers,
}: {
  data: TypeAnswerQuestionData;
  showAnswers: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-4">
        <IconTextSize className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Type your answer here
        </span>
        <span className="ml-auto text-xs text-muted-foreground">Aa</span>
      </div>

      {showAnswers && (
        <div className="space-y-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <IconCheck className="size-4" />
            Accepted answers
          </p>

          <div className="flex flex-wrap gap-2">
            {data.acceptedAnswers.map((answer) => (
              <span key={answer} className="rounded-md border bg-card px-3 py-1.5 text-sm">
                {answer}
              </span>
            ))}
          </div>
        </div>
      )}

      {showAnswers && data.explanation && (
        <p className="rounded-lg bg-primary/[0.03] p-3 text-sm text-muted-foreground">
          {data.explanation}
        </p>
      )}
    </div>
  );
}
