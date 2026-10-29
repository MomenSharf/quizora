"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import type { RuntimePhase } from "../types/runtime-types";

type GameplayPhaseRouterProps = {
  phase: RuntimePhase;
  ready: ReactNode;
  question: ReactNode;
  result: ReactNode;
};

const phaseVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
};

const phaseTransition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function GameplayPhaseRouter({
  phase,
  ready,
  question,
  result,
}: GameplayPhaseRouterProps) {
  const screen =
    phase === "READY"
      ? "ready"
      : phase === "RESULT"
        ? "result"
        : "question";

  const content = {
    ready,
    question,
    result,
  }[screen];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen}
          variants={phaseVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={phaseTransition}
          className="flex h-full min-h-0 flex-1 flex-col"
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}