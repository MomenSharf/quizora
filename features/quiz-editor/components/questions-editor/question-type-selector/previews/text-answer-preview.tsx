"use client";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";

export default function TypeAnswerPreview() {
  const color = QUESTION_TYPE_COLORS['TYPE_ANSWER'];


  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        What is the chemical symbol for Gold?
      </p>

      <div
        className="rounded-xl border bg-background px-4 py-3"
        style={{
          borderColor: `${color}55`,
        }}
      >
        <span className="text-sm text-muted-foreground">
          Type your answer...
        </span>

        <span
          className="ml-1 inline-block h-4 w-px animate-pulse align-middle"
          style={{ backgroundColor: color }}
        />
      </div>

      <div
        className="flex items-center justify-between rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground"
        style={{
          borderColor: `${color}55`,
        }}
      >
        <span>Accepts text input</span>

        <kbd className="rounded border bg-muted px-2 py-1 font-mono">
          Enter
        </kbd>
      </div>
    </div>
  );
}