
"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { EvaluationOutcome } from "../../types/evaluation-types";

type Props = {
  outcome: EvaluationOutcome;
};

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function QuestionResultToast({ outcome }: Props) {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      // The toast is removed through its own animation below.
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  const isCorrect = outcome === "CORRECT";
  const isIncorrect =
    outcome === "INCORRECT" ||
    outcome === "PARTIALLY_CORRECT";
  const isUnanswered = outcome === "UNANSWERED";

  const Icon = isCorrect
    ? CheckCircle2
    : isUnanswered
      ? MinusCircle
      : XCircle;

  const title = isCorrect
    ? "Correct!"
    : isIncorrect
      ? "Incorrect!"
      : isUnanswered
        ? "Unanswered"
        : "Answer submitted";

  const description = isCorrect
    ? "Great job! Keep it up."
    : isIncorrect
      ? "Don't give up. Keep learning!"
      : isUnanswered
        ? "This question was left unanswered."
        : "Your answer has been submitted.";

  const color = isCorrect
    ? "bg-emerald-600"
    : isIncorrect
      ? "bg-red-600"
      : isUnanswered
        ? "bg-amber-500"
        : "bg-primary";

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-[999999]",
        "flex items-center justify-center gap-3",
        "px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))]",
        "text-white shadow-2xl",
        color,
      )}
    >
      <Icon className="size-7 shrink-0" />

      <div className="flex min-w-0 flex-col">
        <span className="text-base font-bold tracking-tight">
          {title}
        </span>

        <span className="text-xs text-white/85">
          {description}
        </span>
      </div>
    </motion.div>,
    document.body,
  );
}
