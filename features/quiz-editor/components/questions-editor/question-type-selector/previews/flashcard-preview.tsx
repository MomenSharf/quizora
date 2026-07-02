"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";

export default function FlashcardPreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "flashcard");
  if (!type) return null;

  const color = type.color;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        What is the capital of France?
      </p>

      <div className="relative">
        <div
          className="rounded-xl border bg-background p-6 text-center shadow-sm"
          style={{
            borderColor: `${color}55`,
          }}
        >
          <p className="text-sm text-muted-foreground">Front side</p>

          <p className="mt-2 text-lg font-medium">Paris</p>

          <div
            className="mt-4 inline-flex items-center rounded-md px-2 py-1 text-xs"
            style={{
              color,
              backgroundColor: `${color}1A`,
            }}
          >
            Click to flip
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center rounded-lg border border-dashed py-2 text-xs text-muted-foreground"
        style={{
          borderColor: `${color}55`,
        }}
      >
        Memory-based learning card
      </div>
    </div>
  );
}