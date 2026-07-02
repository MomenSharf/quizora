"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";

export default function FillBlankPreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "fill_blank");
  if (!type) return null;

  const color = type.color;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Complete the sentence.
      </p>

      <div className="rounded-xl border bg-background p-4">
        <p className="text-sm leading-8">
          The capital of{" "}
          <span
            className="inline-flex min-w-20 items-center justify-center rounded-md border-2 border-dashed bg-opacity-10 px-3 py-1 font-medium"
            style={{
              borderColor: color,
              backgroundColor: `${color}1A`,
              color,
            }}
          >
            _______
          </span>{" "}
          is Cairo.
        </p>
      </div>

      <div
        className="flex items-center justify-between rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground"
        style={{
          borderColor: `${color}55`,
        }}
      >
        <span>Fill the missing word</span>

        <span className="rounded-md bg-muted px-2 py-1">
          1 Blank
        </span>
      </div>
    </div>
  );
}