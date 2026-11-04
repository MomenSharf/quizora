"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { RuntimeView } from "../types/runtime-types";
import { useRuntime } from "../store";

type GameplayPageRouterProps = {
  ready: ReactNode;
  question: ReactNode;
  settings: ReactNode;
  review: ReactNode;
  results: ReactNode;
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -6,
  },
};

const pageTransition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function GameplayViewRouter({
  ready,
  question,
  settings,
  review,
  results,
}: GameplayPageRouterProps) {
  const { currentView } = useRuntime();

  const views: Record<RuntimeView, ReactNode> = {
    READY: ready,
    QUESTION: question,
    SETTINGS: settings,
    REVIEW: review,
    RESULTS: results,
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentView}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          {views[currentView]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
