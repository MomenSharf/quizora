
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

type QuestionTitleProps = {
  title: string;
  description?: string | null;
  questionNumber?: number;
};

export default function QuestionTitle({
  title,
  description,
  questionNumber,
}: QuestionTitleProps) {
  const [showDescription, setShowDescription] = useState(false);

  const hasDescription = Boolean(description?.trim());

  return (
    <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
      {questionNumber !== undefined && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold tabular-nums text-primary sm:size-9">
          {questionNumber}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex min-w-0 items-start gap-2">
          <h2
            title={title}
            className="line-clamp-3 min-w-0 flex-1 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl lg:text-2xl"
          >
            {title}
          </h2>

          {hasDescription && (
            <button
              type="button"
              aria-label={
                showDescription
                  ? "Hide question description"
                  : "Show question description"
              }
              aria-expanded={showDescription}
              onClick={() => setShowDescription((prev) => !prev)}
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {showDescription ? (
                <ChevronUp className="size-[18px]" />
              ) : (
                <HelpCircle className="size-[18px]" />
              )}
            </button>
          )}
        </div>

        {showDescription && hasDescription && (
          <p className="animate-in fade-in slide-in-from-top-1 text-sm leading-relaxed text-muted-foreground duration-200">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
