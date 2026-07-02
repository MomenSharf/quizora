"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";
import { CheckCircle2, Circle } from "lucide-react";

export default function SingleSelectPreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "single_select");
  if (!type) return null;

  const color = type.color;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        What is the capital of France?
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <Circle className="size-4 text-muted-foreground" />
          <span className="text-sm">London</span>
        </div>

        <div
          className="flex items-center gap-3 rounded-xl border px-3 py-2"
          style={{
            borderColor: color,
            backgroundColor: `${color}1A`,
          }}
        >
          <CheckCircle2 className="size-4" style={{ color }} />
          <span className="text-sm font-medium">Paris</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <Circle className="size-4 text-muted-foreground" />
          <span className="text-sm">Rome</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <Circle className="size-4 text-muted-foreground" />
          <span className="text-sm">Madrid</span>
        </div>
      </div>
    </div>
  );
}