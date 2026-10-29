
"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleX,
  Lightbulb,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

type QuestionFeedbackProps = {
  evaluation: {
    outcome: "CORRECT" | "PARTIALLY_CORRECT" | "INCORRECT" | "UNANSWERED" | "NOT_APPLICABLE";
    earnedPoints?: number;
    maxPoints?: number;
  };
  explanation?: string | null;
};

export default function QuestionFeedback({
  evaluation,
  explanation,
}: QuestionFeedbackProps) {
  const isCorrect = evaluation.outcome === "CORRECT";
  const isPartial = evaluation.outcome === "PARTIALLY_CORRECT";
  const isUnanswered = evaluation.outcome === "UNANSWERED";

  const title = isCorrect
    ? "Excellent work!"
    : isPartial
      ? "Partially correct"
      : isUnanswered
        ? "Not answered"
        : evaluation.outcome === "NOT_APPLICABLE"
          ? "Answer submitted"
          : "Not quite right";

  const Icon = isCorrect
    ? CheckCircle2
    : isPartial
      ? Trophy
      : isUnanswered || evaluation.outcome === "NOT_APPLICABLE"
        ? Lightbulb
        : CircleX;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      aria-live="polite"
      className={cn(
        "overflow-hidden rounded-2xl border p-4 sm:p-5",
        isCorrect
          ? "border-emerald-500/20 bg-emerald-500/[0.06]"
          : isPartial
            ? "border-amber-500/20 bg-amber-500/[0.06]"
            : isUnanswered
              ? "border-border bg-muted/40"
              : "border-rose-500/20 bg-rose-500/[0.06]",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            isCorrect
              ? "bg-emerald-500/10 text-emerald-600"
              : isPartial
                ? "bg-amber-500/10 text-amber-600"
                : isUnanswered
                  ? "bg-muted text-muted-foreground"
                  : "bg-rose-500/10 text-rose-600",
          )}
        >
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold tracking-tight">{title}</h3>

            {evaluation.earnedPoints != null &&
              evaluation.maxPoints != null && (
                <span className="rounded-full bg-background/80 px-2.5 py-1 text-xs font-semibold tabular-nums">
                  {evaluation.earnedPoints}/{evaluation.maxPoints} pts
                </span>
              )}
          </div>

          {explanation?.trim() && (
            <div className="mt-3 border-t border-current/10 pt-3">
              <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Lightbulb className="size-4" />
                Explanation
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
