
import { IconEye, IconCheck } from "@tabler/icons-react";

export interface GuessQuestionData {
  correctAnswer: string;
  hint?: string | null;
  explanation?: string | null;
}

export function GuessQuestion({
  data,
  showAnswers,
}: {
  data: GuessQuestionData;
  showAnswers: boolean;
}) {
  return (
    <div className="space-y-3">
      {data.hint && (
        <div className="rounded-lg border bg-muted/20 p-3 text-sm">
          <span className="font-medium">Hint: </span>
          <span className="text-muted-foreground">{data.hint}</span>
        </div>
      )}

      <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-4">
        <IconEye className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Guess the correct answer</span>
      </div>

      {showAnswers && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="mb-1 flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <IconCheck className="size-4" />
            Correct answer
          </p>
          <p className="text-sm font-medium">{data.correctAnswer}</p>
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
