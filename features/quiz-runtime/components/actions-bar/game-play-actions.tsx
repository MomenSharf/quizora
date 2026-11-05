"use client";

import { useMemo, useState } from "react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconCheck,
  IconClipboardCheck,
  IconFlag,
  IconLayoutGrid,
  IconPlayerSkipForward,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useRuntime,
  useRuntimeActionBar,
  useRuntimeActions,
} from "../../store";

import type {
  GameplayAction,
  RuntimeQuestion,
} from "../../types/runtime-types";

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
    icon: IconFlag,
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
  runtimeCurrentQuestion,
}: {
  runtimeCurrentQuestion: RuntimeQuestion;
}) {
  const [openFinishDialog, setOpenFinishDialog] = useState(false);

  const { phase, currentView } = useRuntime();

  const {
    questions,
    mode,
    currentQuestionId,
    isFirstQuestion,
    isFlagged,
    isLocked,
    isCompleted,
    actions,
  } = useRuntimeActionBar();

  const {
    goToNextQuestion,
    goToPreviousQuestion,
    toggleQuestionFlag,
    submitPracticeAnswer,
    submitTestAnswer,
    setCurrentView,
    completeAttempt,
    setCurrentQuestion,
  } = useRuntimeActions();

  const isReady = currentView === "READY";
  const isResult = currentView === "RESULTS";
  const isClassic = mode === "CLASSIC";
  const isTest = mode === "TEST";

  const isPhaseBlocked = BLOCKED_PHASES.includes(
    phase as (typeof BLOCKED_PHASES)[number],
  );

  const isDisabled = isPhaseBlocked || isCompleted;

  const unansweredQuestions = useMemo(
    () =>
      questions
        .map((question, index) => ({
          ...question,
          questionNumber: index + 1,
          questionIndex: index,
        }))
        .filter((question) => question.status === "UNANSWERED"),
    [questions],
  );

  const onFinish = () => {
    if (isTest) {
      // Replace with your final test evaluation action.
      // eslint-disable-next-line react-hooks/purity
      completeAttempt(Date.now());
    } else {
      // eslint-disable-next-line react-hooks/purity
      completeAttempt(Date.now());
    }

    setOpenFinishDialog(false);
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setOpenFinishDialog(false);
  };

  const handleAction = (action: GameplayAction) => {
    if (isDisabled) return;

    switch (action) {
      case "PASS":
        goToNextQuestion();
        break;

      case "NEXT":
        goToNextQuestion();
        break;

      case "SUBMIT":
        if (!currentQuestionId || isLocked) return;

        if (isClassic) {
          submitPracticeAnswer(runtimeCurrentQuestion.id);
        } else if (isTest) {
          submitTestAnswer(runtimeCurrentQuestion.id);
          goToNextQuestion();
        }
        break;

      case "FINISH":
        if (unansweredQuestions.length > 0) {
          setOpenFinishDialog(true);
        } else {
          onFinish();
        }
        break;

      case "RESULTS":
        setCurrentView("RESULTS");
        break;
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
            <p className="text-sm text-muted-foreground">
              Ready when you are.
            </p>
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
                  )}
                >
                  <IconArrowLeft className="size-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
              )}
            </div>

            <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
              {(!isResult && isTest) && (
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
                    onClick={() => setCurrentView("REVIEW")}
                    disabled={isDisabled}
                    aria-label="Open question overview"
                    className="h-10 gap-1.5 rounded-xl px-2.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <IconLayoutGrid className="size-4" />
                    <span className="hidden md:inline">Questions</span>
                  </Button>
                </>
              )}
            </div>

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
                        disabled={isDisabled}
                        className={cn(
                          "h-10 gap-2 rounded-xl px-3 font-medium",
                          "text-xs sm:px-4 sm:text-sm",
                          (action === "SUBMIT" || action === "NEXT") &&
                            "min-w-[108px] shadow-sm",
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

            <Dialog
              open={openFinishDialog}
              onOpenChange={setOpenFinishDialog}
            >
              <DialogContent className="max-w-sm gap-0 overflow-hidden p-0">
                <div className="space-y-5 p-5">
                  <DialogHeader className="space-y-1 text-left">
                    <DialogTitle className="text-base font-semibold">
                      Finish {isTest ? "test" : "quiz"}?
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-relaxed">
                      You have{" "}
                      <span className="font-medium text-foreground">
                        {unansweredQuestions.length} unanswered{" "}
                        {unansweredQuestions.length === 1
                          ? "question"
                          : "questions"}
                      </span>
                      . You can still return to them before finishing.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Unanswered
                      </span>

                      <span className="text-xs tabular-nums text-muted-foreground">
                        {unansweredQuestions.length} remaining
                      </span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {unansweredQuestions.map((question) => (
                        <button
                          key={question.id}
                          type="button"
                          onClick={() =>
                            handleGoToQuestion(question.questionIndex)
                          }
                          aria-label={`Go to question ${question.questionNumber}`}
                          className={cn(
                            "flex size-9 items-center justify-center rounded-lg",
                            "border border-border bg-muted/40",
                            "text-xs font-medium tabular-nums text-foreground",
                            "transition-colors hover:border-amber-500/50",
                            "hover:bg-amber-500/10 hover:text-amber-600",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          )}
                        >
                          {question.questionNumber}
                        </button>
                      ))}
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      Select a number to return to that question.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t bg-muted/20 px-5 py-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpenFinishDialog(false)}
                    className="h-9 px-3 text-xs"
                  >
                    Continue
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    onClick={onFinish}
                    className="h-9 px-3 text-xs"
                  >
                    {isTest ? "Submit test" : "Finish anyway"}
                    <IconCheck className="ml-1 size-3.5" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}