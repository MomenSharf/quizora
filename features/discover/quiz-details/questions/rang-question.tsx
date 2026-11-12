
import { IconCheck,  } from "@tabler/icons-react";
import { SlidersHorizontal } from "lucide-react";

export interface RangeQuestionData {
  min: number;
  max: number;
  correctValue: number;
  unit?: string | null;
  tolerance?: number;
}

export function RangeQuestion({
  data,
  showAnswers,
}: {
  data: RangeQuestionData;
  showAnswers: boolean;
}) {
  return (
    <div className="space-y-4 rounded-xl border bg-muted/10 p-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <SlidersHorizontal className="size-4 text-muted-foreground" />
        Select a value within the range
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{data.min}{data.unit}</span>
          <span>{data.max}{data.unit}</span>
        </div>

        <div className="relative h-2 rounded-full bg-muted">
          <div className="absolute inset-0 rounded-full bg-primary/15" />
          {showAnswers && (
            <div
              className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-background bg-emerald-500 shadow"
              style={{
                left: `${((data.correctValue - data.min) / (data.max - data.min || 1)) * 100}%`,
              }}
            />
          )}
        </div>
      </div>

      {showAnswers && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/5 p-3 text-sm text-emerald-600">
          <IconCheck className="size-4" />
          Correct value: {data.correctValue}{data.unit}
          {data.tolerance != null && ` (±${data.tolerance}${data.unit || ""})`}
        </div>
      )}
    </div>
  );
}
