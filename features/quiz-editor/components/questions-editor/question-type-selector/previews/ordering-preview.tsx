"use client";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { IconGripVertical } from "@tabler/icons-react";

export default function OrderingPreview() {
    const color = QUESTION_TYPE_COLORS['ORDERING'];
  

  const items = ["Wake up", "Have breakfast", "Go to school", "Study"];

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Arrange the daily routine in the correct order.
      </p>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2"
          >
            <div
              className="flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold"
              style={{
                color,
                backgroundColor: `${color}1A`,
              }}
            >
              {index + 1}
            </div>

            <span className="flex-1 text-sm">{item}</span>

            <IconGripVertical className="size-4 text-muted-foreground" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed py-2 text-xs text-muted-foreground">
        <IconGripVertical className="size-3" />
        Drag to reorder
      </div>
    </div>
  );
}