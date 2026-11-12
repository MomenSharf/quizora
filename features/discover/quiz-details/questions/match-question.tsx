
import { IconArrowRight, IconCheck } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export interface MatchQuestionData {
  pairs: {
    id: string;
    left: string;
    right: string;
  }[];
  explanation?: string | null;
}

export function MatchQuestion({
  data,
  showAnswers,
}: {
  data: MatchQuestionData;
  showAnswers: boolean;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Match each item with its corresponding pair
      </p>

      {data.pairs.map((pair, index) => (
        <div key={pair.id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="rounded-lg border bg-card p-3 text-sm">
            {pair.left}
          </div>

          <div className="flex items-center justify-center">
            <IconArrowRight className="size-4 text-muted-foreground" />
          </div>

          <div
            className={cn(
              "flex items-center gap-2 rounded-lg border p-3 text-sm",
              showAnswers && "border-emerald-500/30 bg-emerald-500/5",
            )}
          >
            <span className="min-w-0 flex-1">{pair.right}</span>
            {showAnswers && <IconCheck className="size-4 shrink-0 text-emerald-600" />}
          </div>
        </div>
      ))}

      {showAnswers && data.explanation && (
        <p className="rounded-lg bg-primary/[0.03] p-3 text-sm text-muted-foreground">
          {data.explanation}
        </p>
      )}
    </div>
  );
}
