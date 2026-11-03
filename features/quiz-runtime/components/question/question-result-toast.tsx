
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  ClockAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { EvaluationOutcome } from "../../types/evaluation-types";

type Props = {
  outcome: EvaluationOutcome;
};

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const variants = {
  CORRECT: {
    title: "Correct!",
    description: "Great job! Keep it up.",
    icon: CheckCircle2,
    color: "bg-emerald-600",
  },
  INCORRECT: {
    title: "Incorrect!",
    description: "Don't give up. Keep learning!",
    icon: XCircle,
    color: "bg-red-600",
  },
  PARTIALLY_CORRECT: {
    title: "Partially correct!",
    description: "You got some of it right.",
    icon: XCircle,
    color: "bg-amber-500",
  },
  UNANSWERED: {
    title: "Unanswered",
    description: "This question was left unanswered.",
    icon: MinusCircle,
    color: "bg-amber-500",
  },
  TIMEOUT: {
    title: "Time's up!",
    description: "Time ran out for this question.",
    icon: ClockAlert,
    color: "bg-amber-500",
  },
  NOT_APPLICABLE: {
    title: "Answer submitted",
    description: "Your answer has been submitted.",
    icon: CheckCircle2,
    color: "bg-primary",
  },
} satisfies Record<
  EvaluationOutcome,
  {
    title: string;
    description: string;
    icon: typeof CheckCircle2;
    color: string;
  }
>;

export default function QuestionResultToast({ outcome }: Props) {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    const timeout = setTimeout(() => {
      setVisible(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [outcome]);

  if (!mounted) return null;

  const { title, description, icon: Icon, color } = variants[outcome];

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          key={outcome}
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
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
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
