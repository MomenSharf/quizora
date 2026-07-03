"use client";

import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";
import { Sparkles } from "lucide-react";

export default function GuessPreview() {
  const type = QUESTION_TYPES.find((t) => t.id === "GUESS");
  if (!type) return null;

  const color = type.color;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Guess the country.
      </p>

      <div className="rounded-xl border bg-background p-4">
        <div className="space-y-3">
          <div
            className="flex items-center gap-2"
            style={{ color }}
          >
            <Sparkles className="size-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Clue #1
            </span>
          </div>

          <p className="text-sm">
            I am home to the Great Pyramid of Giza.
          </p>

          <div
            className="rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground"
            style={{
              borderColor: `${color}55`,
            }}
          >
            Your guess...
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              disabled
              className="rounded-lg border px-3 py-1.5 text-xs text-muted-foreground"
              style={{
                borderColor: `${color}33`,
              }}
            >
              Reveal next clue
            </button>

            <span className="text-xs text-muted-foreground">
              1 / 3 clues
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}