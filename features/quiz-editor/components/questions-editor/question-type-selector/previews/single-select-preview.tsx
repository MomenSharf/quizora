"use client";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { IconCircle, IconCircleCheck } from "@tabler/icons-react";

export default function SingleSelectPreview() {
    const color = QUESTION_TYPE_COLORS['FILL_BLANK'];
  

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        What is the capital of France?
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <IconCircle className="size-4 text-muted-foreground" />
          <span className="text-sm">London</span>
        </div>

        <div
          className="flex items-center gap-3 rounded-xl border px-3 py-2"
          style={{
            borderColor: color,
            backgroundColor: `${color}1A`,
          }}
        >
          <IconCircleCheck className="size-4" style={{ color }} />
          <span className="text-sm font-medium">Paris</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <IconCircle className="size-4 text-muted-foreground" />
          <span className="text-sm">Rome</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <IconCircle className="size-4 text-muted-foreground" />
          <span className="text-sm">Madrid</span>
        </div>
      </div>
    </div>
  );
}