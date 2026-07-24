"use client";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react";

export default function TrueFalsePreview() {
    const color = QUESTION_TYPE_COLORS['TRUE_FALSE'];
  

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        The Earth revolves around the Sun.
      </p>

      <div className="space-y-2">
        <div
          className="flex items-center gap-3 rounded-xl border px-3 py-2"
          style={{
            borderColor: color,
            backgroundColor: `${color}1A`,
          }}
        >
          <IconCircleCheck className="size-4" style={{ color }} />
          <span className="text-sm font-medium">True</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <IconXboxX  className="size-4 text-muted-foreground" />
          <span className="text-sm">False</span>
        </div>
      </div>
    </div>
  );
}