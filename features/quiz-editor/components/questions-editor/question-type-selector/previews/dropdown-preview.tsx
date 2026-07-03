"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";
import { ChevronDown } from "lucide-react";

export default function DropdownPreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "DROPDOWN");
  if (!type) return null;

  const color = type.color;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Select the capital of France.
      </p>

      <div
        className="flex items-center justify-between rounded-xl border px-3 py-2"
        style={{
          borderColor: color,
          backgroundColor: `${color}1A`,
        }}
      >
        <span className="text-sm font-medium">Paris</span>

        <ChevronDown
          className="size-4 transition-transform"
          style={{ color }}
        />
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <div className="border-b px-3 py-2 text-sm text-muted-foreground">
          London
        </div>

        <div
          className="border-b px-3 py-2 text-sm font-medium"
          style={{
            color,
            backgroundColor: `${color}12`,
          }}
        >
          Paris
        </div>

        <div className="border-b px-3 py-2 text-sm text-muted-foreground">
          Rome
        </div>

        <div className="px-3 py-2 text-sm text-muted-foreground">
          Madrid
        </div>
      </div>
    </div>
  );
}