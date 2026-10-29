
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconLayoutGrid,
} from "@tabler/icons-react";
import {
  useRuntimeActionBar,
  useRuntimeActions,
  useRuntimePhase,
} from "../../store";

type GamePlayActionsProps = {
  onOpenQuestionList?: () => void;
  disabled?: boolean;
};

const footerVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const footerTransition = {
  duration: 0.22,
  ease: "easeOut" as const,
};

export default function GamePlayActions({
  onOpenQuestionList,
  disabled = false,
}: GamePlayActionsProps) {
  const phase = useRuntimePhase();

  const {
    currentQuestionId,
    isFirstQuestion,
    isLastQuestion,
    isFlagged,
    nextAction
  } = useRuntimeActionBar();

  const {
    goToNextQuestion,
    goToPreviousQuestion,
    toggleQuestionFlag,
  } = useRuntimeActions();

  const isReady = phase === "READY";

  return (
    <footer className="flex justify-center overflow-hidden border-t border-border/60 bg-background/85 backdrop-blur-xl">
      <AnimatePresence mode="wait" initial={false}>
        {isReady ? (
          <motion.div
            key="ready"
            variants={footerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={footerTransition}
            className="container flex h-14 items-center justify-between px-4 text-sm text-muted-foreground sm:h-16"
          >
            <span>Ready when you are</span>
            <span className="text-xs sm:text-sm">
              Take your time and enjoy learning.
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="gameplay"
            variants={footerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={footerTransition}
            className="container flex h-14 items-center justify-between gap-2 px-2 sm:h-16 sm:gap-4 sm:px-4"
          >
            <Button
              type="button"
              variant="ghost"
              onClick={goToPreviousQuestion}
              disabled={disabled || isFirstQuestion}
              className="h-9 gap-1 rounded-lg px-2.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground sm:gap-1.5 sm:px-3"
            >
              <IconArrowLeft className="size-4" stroke={1.8} />
              <span>Previous</span>
            </Button>

            <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (currentQuestionId) {
                    toggleQuestionFlag(currentQuestionId);
                  }
                }}
                disabled={disabled || !currentQuestionId}
                aria-pressed={isFlagged}
                className={`h-9 gap-1 rounded-lg px-2 text-xs hover:bg-muted sm:gap-1.5 sm:px-3 ${
                  isFlagged
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <IconBookmark
                  className="size-4"
                  stroke={1.8}
                  fill={isFlagged ? "currentColor" : "none"}
                />
                <span className="hidden sm:inline">
                  {isFlagged ? "Marked for review" : "Mark for review"}
                </span>
                <span className="sm:hidden">
                  {isFlagged ? "Marked" : "Review"}
                </span>
              </Button>

              <div className="hidden h-7 w-px shrink-0 bg-border sm:block" />

              <Button
                type="button"
                variant="outline"
                onClick={onOpenQuestionList}
                disabled={disabled}
                aria-label="Open question list"
                className="h-9 gap-1 rounded-lg px-2 text-xs hover:bg-muted sm:gap-1.5 sm:px-3"
              >
                <IconLayoutGrid className="size-4" stroke={1.8} />
                <span className="hidden sm:inline">Review questions</span>
              </Button>
            </div>

            <div className="flex gap-1 sm:gap-2">
              <Button
                type="button"
                onClick={goToNextQuestion}
                disabled={disabled || isLastQuestion}
                className="h-9 shrink-0 gap-1 rounded-lg px-3 text-xs sm:gap-1.5 sm:px-4"
              >
                <span>{nextAction}</span>
                <IconArrowRight className="size-4" stroke={1.8} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
