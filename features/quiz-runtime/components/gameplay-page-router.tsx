"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type GameplayPageRouterProps = {
  isReady: boolean;
  isReviewOpen: boolean;
  isCompleted: boolean;

  ready: ReactNode;
  gameplay: ReactNode;
  review: ReactNode;
  result: ReactNode;
};

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
};

const pageTransition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function GameplayPageRouter({
  isReady,
  isReviewOpen,
  isCompleted,
  ready,
  gameplay,
  review,
  result,
}: GameplayPageRouterProps) {
  const page = isReady
    ? "ready"
    : isReviewOpen
      ? "review"
      : isCompleted
        ? "result"
        : "gameplay";

  const pages = {
    ready,
    gameplay,
    review,
    result,
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="flex h-full min-h-0 flex-1 flex-col"
        >
          {pages[page]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}