"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";
import { Check } from "lucide-react";

export default function MultipleSelectPreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "MULTIPLE_SELECT");
  if (!type) return null;

  const color = type.color;

  const selectedStyle = {
    borderColor: color,
    backgroundColor: `${color}1A`,
  };

  const checkboxStyle = {
    borderColor: color,
    backgroundColor: color,
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Which of these are programming languages?
      </p>

      <div className="space-y-2">
        <div
          className="flex items-center gap-3 rounded-xl border-2 px-3 py-2 dark:bg-opacity-20"
          style={selectedStyle}
        >
          <div
            className="flex size-4 items-center justify-center rounded border"
            style={checkboxStyle}
          >
            <Check className="size-3 text-white" />
          </div>

          <span className="text-sm font-medium">JavaScript</span>
        </div>

        <div
          className="flex items-center gap-3 rounded-xl border-2 px-3 py-2 dark:bg-opacity-20"
          style={selectedStyle}
        >
          <div
            className="flex size-4 items-center justify-center rounded border"
            style={checkboxStyle}
          >
            <Check className="size-3 text-white" />
          </div>

          <span className="text-sm font-medium">Python</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <div className="size-4 rounded border" />
          <span className="text-sm">Photoshop</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2">
          <div className="size-4 rounded border" />
          <span className="text-sm">Figma</span>
        </div>
      </div>
    </div>
  );
}