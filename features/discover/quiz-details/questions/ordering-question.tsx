
import { IconGripVertical, IconCheck } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export interface OrderingQuestionData {
  items: {
    id: string;
    text: string;
    correctOrder: number;
  }[];
  explanation?: string | null;
}

export function OrderingQuestion({
  data,
  showAnswers,
}: {
  data: OrderingQuestionData;
  showAnswers: boolean;
}) {
  const items = showAnswers
    ? [...data.items].sort((a, b) => a.correctOrder - b.correctOrder)
    : data.items;

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Arrange the items in the correct order
      </p>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-lg border bg-card p-3"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold">
            {index + 1}
          </span>

          <p className="flex-1 text-sm">{item.text}</p>

          {showAnswers ? (
            <IconCheck className="size-4 text-emerald-600" />
          ) : (
            <IconGripVertical className="size-4 text-muted-foreground/50" />
          )}
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
