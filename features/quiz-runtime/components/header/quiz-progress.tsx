"use client";

import { AnimatePresence, motion } from "framer-motion";

type QuizProgressProps = {
  phase: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
};

export default function QuizProgress({
  phase,
  currentQuestionIndex,
  totalQuestions,
  progress,
}: QuizProgressProps) {
  const isReady = phase === "READY";

  return (
    <div className="flex min-w-0 flex-[0.8] items-center justify-center sm:flex-1">
      <AnimatePresence mode="wait" initial={false}>
        {isReady ? (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-8 items-center justify-center"
          >
            <span className="text-xs font-medium text-muted-foreground sm:text-sm">
              Let’s get started!
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex w-full max-w-[240px] min-w-0 flex-col items-center gap-1.5"
          >
            <div className="flex items-center gap-1 text-[11px] font-medium leading-none tabular-nums sm:text-xs">
              <span className="text-foreground">
                Question {currentQuestionIndex}
              </span>
              <span className="text-muted-foreground">of {totalQuestions}</span>
            </div>

            <div
              className="h-1 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={totalQuestions}
              aria-valuenow={Math.min(currentQuestionIndex, totalQuestions)}
            >
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
