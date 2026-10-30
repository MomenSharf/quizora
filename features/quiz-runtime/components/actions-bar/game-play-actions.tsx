"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconCheck,
  IconLayoutGrid,
} from "@tabler/icons-react";
import {
  useRuntimeActionBar,
  useRuntimeActions,
  useRuntimePhase,
} from "../../store";
import type { GameplayAction } from "../../types/runtime-types";

type GamePlayActionsProps = {
  onOpenQuestionList?: () => void;
  onSubmitAnswer?: () => void;
  onFinishAttempt?: () => void;
  onOpenResults?: () => void;
  disabled?: boolean;
};

type ActionConfig = {
  label: string;
  variant: "default" | "outline" | "secondary";
  icon?: typeof IconArrowRight;
};

export const GAMEPLAY_ACTIONS: Record<GameplayAction, ActionConfig> = {
  PASS: {
    label: "Pass",
    variant: "outline",
    icon: IconArrowRight,
  },
  SUBMIT: {
    label: "Submit",
    variant: "default",
    icon: IconCheck,
  },
  NEXT: {
    label: "Next",
    variant: "default",
    icon: IconArrowRight,
  },
  FINISH: {
    label: "Finish",
    variant: "default",
    icon: IconCheck,
  },
  RESULTS: {
    label: "Go to Results",
    variant: "default",
    icon: IconArrowRight,
  },
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

const BLOCKED_PHASES = ["SUBMITTING", "PAUSED", "FINISHED"] as const;

export default function GamePlayActions({
  onOpenQuestionList,
  onSubmitAnswer,
  onFinishAttempt,
  onOpenResults,
  disabled = false,
}: GamePlayActionsProps) {
  const phase = useRuntimePhase();

  const { currentQuestionId, isFirstQuestion, isFlagged, isLocked, actions } =
    useRuntimeActionBar();

  const { goToNextQuestion, goToPreviousQuestion, toggleQuestionFlag } =
    useRuntimeActions();

  const isReady = phase === "READY";
  const isResult = phase === "RESULT";

  const isPhaseBlocked = BLOCKED_PHASES.includes(
    phase as (typeof BLOCKED_PHASES)[number],
  );

  const isDisabled = disabled || isPhaseBlocked;

  const canSubmit = !!onSubmitAnswer;
  const canFinish = !!onFinishAttempt;
  const canOpenResults = !!onOpenResults;

  const handleAction = (action: GameplayAction) => {
    if (isDisabled) return;

    switch (action) {
      case "PASS":
      case "NEXT":
        goToNextQuestion();
        break;

      case "SUBMIT":
        if (!isLocked && canSubmit) {
          void onSubmitAnswer();
        }
        break;

      case "FINISH":
        if (canFinish) {
          void onFinishAttempt();
        }
        break;

      case "RESULTS":
        if (canOpenResults) {
          onOpenResults();
        }
        break;
    }
  };

  const isActionDisabled = (action: GameplayAction) => {
    if (isDisabled) return true;

    switch (action) {
      case "SUBMIT":
        return isLocked || !canSubmit;

      case "FINISH":
        return !canFinish;

      case "RESULTS":
        return !canOpenResults;

      default:
        return false;
    }
  };

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
            key={isResult ? "results" : "gameplay"}
            variants={footerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={footerTransition}
            className="container flex h-14 items-center justify-between gap-2 px-2 sm:h-16 sm:gap-4 sm:px-4"
          >
            {/* Previous */}
            <Button
              type="button"
              variant="ghost"
              onClick={goToPreviousQuestion}
              disabled={isDisabled || isFirstQuestion || isResult}
              className={cn(
                "h-9 gap-1 rounded-lg px-2.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground sm:gap-1.5 sm:px-3",
                isFirstQuestion && "hidden",
              )}
            >
              <IconArrowLeft className="size-4" stroke={1.8} />
              <span>Previous</span>
            </Button>

            {/* Question utilities */}
            <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
              {!isResult && (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      if (currentQuestionId) {
                        toggleQuestionFlag(currentQuestionId);
                      }
                    }}
                    disabled={isDisabled || !currentQuestionId}
                    aria-pressed={isFlagged}
                    className={cn(
                      "h-9 gap-1 rounded-lg px-2 text-xs hover:bg-muted sm:gap-1.5 sm:px-3",
                      isFlagged
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <IconBookmark
                      className="size-4"
                      stroke={1.8}
                      fill={isFlagged ? "currentColor" : "none"}
                    />
                    <span className="hidden sm:inline">
                      {isFlagged ? "Marked for review" : "Mark for review"}
                    </span>
                  </Button>

                  <div className="hidden h-7 w-px shrink-0 bg-border sm:block" />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={onOpenQuestionList}
                    disabled={isDisabled || !onOpenQuestionList}
                    aria-label="Open question list"
                    className="h-9 gap-1 rounded-lg px-2 text-xs hover:bg-muted sm:gap-1.5 sm:px-3"
                  >
                    <IconLayoutGrid className="size-4" stroke={1.8} />
                    <span className="hidden sm:inline">Review questions</span>
                  </Button>
                </>
              )}
            </div>

            {/* Main actions */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {actions.map((action) => {
                  const config = GAMEPLAY_ACTIONS[action];
                  const ActionIcon = config.icon;

                  return (
                    <motion.div
                      key={action}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.16 }}
                    >
                      <Button
                        type="button"
                        variant={config.variant}
                        onClick={() => handleAction(action)}
                        disabled={isActionDisabled(action)}
                        className="h-9 gap-1 rounded-lg px-3 text-xs sm:gap-1.5 sm:px-4"
                      >
                        <span>{config.label}</span>
                        {ActionIcon && (
                          <ActionIcon className="size-4" stroke={1.8} />
                        )}
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
