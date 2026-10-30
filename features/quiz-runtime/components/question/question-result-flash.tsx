"use client";

import { motion } from "framer-motion";
import { EvaluationOutcome } from "../../types/evaluation-types";

type QuestionResultFlashProps = {
  outcome: EvaluationOutcome;
  onAnimationComplete: () => void;
};

const flashColors: Record<EvaluationOutcome, string | null> = {
  CORRECT: "bg-emerald-500",
  INCORRECT: "bg-rose-500",
  PARTIALLY_CORRECT: "bg-amber-500",
  UNANSWERED: null,
  NOT_APPLICABLE: null,
};

export default function QuestionResultFlash({
  outcome,
  onAnimationComplete,
}: QuestionResultFlashProps) {
  const color = flashColors[outcome];

  if (!color) return null;

  return (
    <motion.div
      key={outcome}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.09, 0] }}
      transition={{
        duration: 0.65,
        times: [0, 0.2, 1],
        ease: "easeOut",
      }}
      onAnimationComplete={onAnimationComplete}
      className={`pointer-events-none fixed inset-0 z-100 ${color}`}
    />
  );
}
