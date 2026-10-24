"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import type { RuntimePhase } from "../types/runtime-types";

type GameplayPhaseRouterProps = {
  phase: RuntimePhase;
  ready: ReactNode;
  question: ReactNode;
  submitting: ReactNode;
  feedback: ReactNode;
  paused: ReactNode;
  result: ReactNode;
};

const phaseVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.99,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.995,
    filter: "blur(2px)",
  },
};

const phaseTransition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function GameplayPhaseRouter({
  phase,
  ready,
  question,
  submitting,
  feedback,
  paused,
  result,
}: GameplayPhaseRouterProps) {
  const isFeedback = phase === "FEEDBACK";

  const content: Record<RuntimePhase, ReactNode> = {
    READY: ready,
    QUESTION: question,
    SUBMITTING: submitting,
    FEEDBACK: question,
    PAUSED: paused,
    RESULT: result,
  };

  const isQuestionFlow = phase === "QUESTION" || isFeedback;

  return (
    <div className="relative min-h-0 flex-1">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isQuestionFlow ? "question-flow" : phase}
          variants={phaseVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={phaseTransition}
          className="h-full min-h-0"
        >
          {content[phase]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isFeedback && (
          <motion.div
            key="feedback-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 z-30 flex items-end justify-center overflow-y-auto bg-background/35 p-3 backdrop-blur-[2px] sm:items-center sm:p-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 360,
                damping: 30,
                mass: 0.8,
              }}
              className="w-full max-w-xl"
            >
              {feedback}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}