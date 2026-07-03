"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";
import { ArrowRight, GitCompareArrows } from "lucide-react";

export default function MatchPreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "MATCH");
  if (!type) return null;

  const color = type.color;

  const pairs = [
    ["Dog", "Animal"],
    ["Apple", "Fruit"],
    ["Car", "Vehicle"],
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Match each item with its category.
      </p>

      <div className="space-y-3">
        {pairs.map(([left, right]) => (
          <div key={left} className="flex items-center gap-3">
            <div className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm">
              {left}
            </div>

            <ArrowRight className="size-4 shrink-0" style={{ color }} />

            <div
              className="flex-1 rounded-xl border px-3 py-2 text-sm"
              style={{
                borderColor: color,
                backgroundColor: `${color}1A`,
              }}
            >
              {right}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed py-2 text-xs text-muted-foreground">
        <GitCompareArrows className="size-3" />
        Match each pair
      </div>
    </div>
  );
}