"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";

export default function RangePreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "RANGE");
  if (!type) return null;

  const color = type.color;

  const min = 0;
  const max = 100;
  const value = 65;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Select the approximate percentage of water on Earth.
      </p>

      <div className="space-y-3 rounded-xl border bg-background p-4">
        {/* Track */}
        <div className="relative h-2 w-full rounded-full bg-muted">
          {/* Active fill */}
          <div
            className="absolute left-0 top-0 h-2 rounded-full"
            style={{
              width: `${value}%`,
              backgroundColor: color,
            }}
          />

          {/* Thumb */}
          <div
            className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 bg-white shadow"
            style={{
              left: `calc(${value}% - 8px)`,
              borderColor: color,
            }}
          />
        </div>

        {/* Labels */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{min}%</span>
          <span className="font-medium" style={{ color }}>
            {value}%
          </span>
          <span>{max}%</span>
        </div>
      </div>

      <div
        className="flex items-center justify-between rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground"
        style={{
          borderColor: `${color}55`,
        }}
      >
        <span>Drag to adjust value</span>

        <span className="rounded-md bg-muted px-2 py-1">
          0 - 100
        </span>
      </div>
    </div>
  );
}