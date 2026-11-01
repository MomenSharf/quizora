"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconCheck,
  IconClipboardCheck,
  IconLayoutGrid,
  IconPlayerSkipForward,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  icon: typeof IconArrowRight;
  variant: "default" | "outline" | "secondary";
};

const GAMEPLAY_ACTIONS: Record<GameplayAction, ActionConfig> = {
  PASS: {
    label: "Pass",
    icon: IconPlayerSkipForward,
    variant: "outline",
  },
  SUBMIT: {
    label: "Submit",
    icon: IconCheck,
    variant: "default",
  },
  NEXT: {
    label: "Next",
    icon: IconArrowRight,
    variant: "default",
  },
  FINISH: {
    label: "Finish",
    icon: IconCheck,
    variant: "default",
  },
  RESULTS: {
    label: "View results",
    icon: IconClipboardCheck,
    variant: "default",
  },
};

const footerVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
};

const footerTransition = {
  duration: 0.2,
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

  const {
    mode,
    currentQuestionId,
    isFirstQuestion,
    isFlagged,
    isLocked,
    isCompleted,
    actions,
  } = useRuntimeActionBar();

  const { goToNextQuestion, goToPreviousQuestion, toggleQuestionFlag } =
    useRuntimeActions();

  const isReady = phase === "READY";
  const isResult = phase === "RESULT";

  const isPhaseBlocked = BLOCKED_PHASES.includes(
    phase as (typeof BLOCKED_PHASES)[number],
  );

  const isDisabled = disabled || isPhaseBlocked || isCompleted;

  const handleAction = (action: GameplayAction) => {
    if (isDisabled) return;

    switch (action) {
      case "PASS":
      case "NEXT":
        goToNextQuestion();
        break;

      case "SUBMIT":
        if (!isLocked) {
          onSubmitAnswer?.();
        }
        break;

      case "FINISH":
        onFinishAttempt?.();
        break;

      case "RESULTS":
        onOpenResults?.();
        break;
    }
  };

  const isActionDisabled = (action: GameplayAction) => {
    if (isDisabled) return true;

    switch (action) {
      case "SUBMIT":
        return isLocked || !onSubmitAnswer;

      case "FINISH":
        return !onFinishAttempt;

      case "RESULTS":
        return !onOpenResults;

      default:
        return false;
    }
  };

  return (
    <footer className="relative z-20 border-t border-border/60 bg-background/95 backdrop-blur-xl">
      <AnimatePresence mode="wait" initial={false}>
        {isReady ? (
          <motion.div
            key="ready"
            variants={footerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={footerTransition}
            className="container flex h-14 items-center justify-center px-4 sm:h-16"
          >
            <p className="text-sm text-muted-foreground">Ready when you are.</p>
          </motion.div>
        ) : (
          <motion.div
            key={isResult ? "results" : "gameplay"}
            variants={footerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={footerTransition}
            className="container flex h-14 items-center justify-between gap-2 px-3 sm:h-[68px] sm:px-5"
          >
            {/* Previous question */}
            <div className="flex min-w-0 items-center">
              {!isResult && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousQuestion}
                  disabled={isDisabled || isFirstQuestion}
                  className={cn(
                    "h-10 gap-1.5 rounded-xl px-2.5 text-muted-foreground",
                    "hover:bg-muted hover:text-foreground",
                    isFirstQuestion && "invisible",
                  )}
                >
                  <IconArrowLeft className="size-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
              )}
            </div>

            {/* Question tools */}
            {mode === "REVIEW" && (
              <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
                {!isResult && (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (currentQuestionId) {
                          toggleQuestionFlag(currentQuestionId);
                        }
                      }}
                      disabled={isDisabled || !currentQuestionId}
                      aria-label={
                        isFlagged ? "Remove review mark" : "Mark for review"
                      }
                      aria-pressed={isFlagged}
                      className={cn(
                        "h-10 gap-1.5 rounded-xl px-2.5 text-muted-foreground",
                        "hover:bg-muted hover:text-foreground",
                        isFlagged && "text-primary hover:text-primary",
                      )}
                    >
                      <IconBookmark
                        className="size-4"
                        fill={isFlagged ? "currentColor" : "none"}
                        stroke={1.8}
                      />
                      <span className="hidden md:inline">
                        {isFlagged ? "Marked" : "Mark"}
                      </span>
                    </Button>

                    <div className="mx-1 h-6 w-px bg-border/70" />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onOpenQuestionList}
                      disabled={isDisabled || !onOpenQuestionList}
                      aria-label="Open question overview"
                      className="h-10 gap-1.5 rounded-xl px-2.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <IconLayoutGrid className="size-4" />
                      <span className="hidden md:inline">Questions</span>
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Primary actions */}
            <div className="flex shrink-0 items-center justify-end gap-1.5">
              <AnimatePresence mode="popLayout" initial={false}>
                {actions.map((action) => {
                  const config = GAMEPLAY_ACTIONS[action];
                  const ActionIcon = config.icon;

                  return (
                    <motion.div
                      key={action}
                      layout
                      initial={{ opacity: 0, scale: 0.94, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: 4 }}
                      transition={{ duration: 0.16 }}
                    >
                      <Button
                        type="button"
                        variant={config.variant}
                        onClick={() => handleAction(action)}
                        disabled={isActionDisabled(action)}
                        className={cn(
                          "h-10 gap-2 rounded-xl px-3 font-medium",
                          "text-xs sm:px-4 sm:text-sm",
                          action === "SUBMIT" && "min-w-[108px] shadow-sm",
                          action === "NEXT" && "min-w-[108px] shadow-sm",
                        )}
                      >
                        <span>{config.label}</span>
                        <ActionIcon className="size-4" stroke={2} />
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
