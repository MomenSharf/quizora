"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";

export default function LocationPreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "LOCATION");
  if (!type) return null;

  const color = type.color;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Where is Egypt located?
      </p>

      <div className="relative overflow-hidden rounded-xl border bg-muted/30">
        <div className="aspect-16/10 w-full">
          <svg
            viewBox="0 0 320 200"
            className="h-full w-full"
            fill="none"
          >
            <path
              d="M20 35L95 20L155 45L225 28L300 55V175H20Z"
              className="fill-muted"
            />

            <path
              d="M45 70L90 58L120 85L170 70L205 92L250 80L280 110L250 145L175 138L125 155L80 125L50 95Z"
              className="fill-border"
            />

            <circle cx="188" cy="88" r="18" fill={`${color}33`} />
            <circle cx="188" cy="88" r="8" fill={color} />
          </svg>
        </div>

        <div className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-1 text-[10px] font-medium shadow">
          World Map
        </div>
      </div>

      <div
        className="flex items-center justify-center rounded-lg border border-dashed py-2 text-xs text-muted-foreground"
        style={{
          borderColor: `${color}55`,
        }}
      >
        Click the highlighted region
      </div>
    </div>
  );
}