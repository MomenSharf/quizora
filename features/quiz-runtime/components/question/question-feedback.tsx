"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleX,
  MinusCircle,
  Trophy,
  ClockAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { EvaluationResult } from "@/features/quiz-runtime/types/evaluation-types";

type QuestionFeedbackProps = {
  evaluation: EvaluationResult;
};

const variants = {
  CORRECT: {
    title: "Correct answer",
    icon: CheckCircle2,
    className: "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600",
    iconClassName: "bg-emerald-500/10",
  },
  PARTIALLY_CORRECT: {
    title: "Partially correct",
    icon: Trophy,
    className: "border-amber-500/20 bg-amber-500/[0.06] text-amber-600",
    iconClassName: "bg-amber-500/10",
  },
  INCORRECT: {
    title: "Incorrect answer",
    icon: CircleX,
    className: "border-rose-500/20 bg-rose-500/[0.06] text-rose-600",
    iconClassName: "bg-rose-500/10",
  },
  UNANSWERED: {
    title: "Not answered",
    icon: MinusCircle,
    className: "border-border bg-muted/40 text-muted-foreground",
    iconClassName: "bg-muted",
  },
  TIMEOUT: {
    title: "Time's up!",
    icon: ClockAlert,
    className: "border-orange-500/20 bg-orange-500/[0.06] text-orange-600",
    iconClassName: "bg-orange-500/10",
  },
  NOT_APPLICABLE: {
    title: "Answer submitted",
    icon: MinusCircle,
    className: "border-border bg-muted/40 text-muted-foreground",
    iconClassName: "bg-muted",
  },
} satisfies Record<
  EvaluationResult["outcome"],
  {
    title: string;
    icon: typeof CheckCircle2;
    className: string;
    iconClassName: string;
  }
>;

export default function QuestionFeedback({
  evaluation,
}: QuestionFeedbackProps) {
  const isTimeout = evaluation.outcome === "TIMEOUT";
  const isEvaluated = evaluation.status === "EVALUATED";

  if (!isEvaluated && !isTimeout) {
    return null;
  }

  const result = variants[evaluation.outcome];
  const Icon = result.icon;

  const hasAccuracy = evaluation.accuracy !== null;
  const hasFeedback = Boolean(evaluation.feedback?.trim());

  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      aria-live="polite"
      className={cn("rounded-xl border px-3.5 py-3 sm:px-4", result.className)}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            result.iconClassName,
          )}
        >
          <Icon className="size-[18px]" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-tight text-foreground">
            {result.title}
          </h3>

          {hasFeedback && (
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {evaluation.feedback}
            </p>
          )}
        </div>

        <div className="shrink-0 rounded-lg bg-background/70 px-2.5 py-1.5 text-xs font-semibold tabular-nums text-foreground">
          {evaluation.earnedPoints}/{evaluation.maxPoints}
          <span className="ml-1 font-medium text-muted-foreground">pts</span>
        </div>

        {hasAccuracy && (
          <div className="shrink-0 rounded-lg bg-background/70 px-2.5 py-1.5 text-xs font-semibold tabular-nums text-foreground">
            {Math.round(evaluation.accuracy!)}%
          </div>
        )}
      </div>
    </motion.section>
  );
}
