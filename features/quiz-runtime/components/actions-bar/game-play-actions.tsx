"use client";

import { useEffect, useMemo, useState } from "react";
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
  SUBMIT_DISABLED: {
    label: "Submit",
    icon: IconCheck,
    variant: "default",
  },
  NEXT: {
    label: "Next",
    icon: IconArrowRight,
    variant: "default",
  },
  NEXT_DISABLED: {
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
    reviewEnabled,
    questions,
    mode,
    currentQuestionId,
    isFirstQuestion,
    isFlagged,
    isLocked,
    isCompleted,
    actions,
    keyboardShortcutsEnabled,
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

  const incompleteQuestions = useMemo(
    () =>
      questions
        .map((question, index) => ({
          ...question,
          questionNumber: index + 1,
          questionIndex: index,
        }))
        .filter(
          (question) =>
            question.status === "UNANSWERED" || !question.evaluation,
        ),
    [questions],
  );

  const onFinish = () => {
    completeAttempt(new Date());
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
        if (
          unansweredQuestions.length > 0 ||
          (incompleteQuestions.length > 0 && isClassic)
        ) {
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

  useEffect(() => {
    if (!keyboardShortcutsEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        event.shiftKey ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        openFinishDialog ||
        isReady ||
        isResult ||
        isDisabled
      ) {
        return;
      }

      const target = event.target as HTMLElement;

      if (
        target.closest(
          "input, textarea, select, button, [contenteditable='true']",
        )
      ) {
        return;
      }

      if (!currentQuestionId) return;

      switch (event.key) {
        case "Enter": {
          if (event.ctrlKey && actions.includes("FINISH")) {
            event.preventDefault();

            if (
              unansweredQuestions.length > 0 ||
              (incompleteQuestions.length > 0 && isClassic)
            ) {
              setOpenFinishDialog(true);
            } else {
              onFinish();
            }

            return;
          }

          if (isClassic) {
            if (actions.includes("SUBMIT") && !isLocked) {
              event.preventDefault();
              submitPracticeAnswer(currentQuestionId);
              return;
            }

            if (actions.includes("NEXT") && isLocked) {
              event.preventDefault();
              goToNextQuestion();
            }

            return;
          }

          if (
            isTest &&
            runtimeCurrentQuestion.status === "ANSWERED" &&
            actions.includes("NEXT")
          ) {
            event.preventDefault();
            goToNextQuestion();
          }

          return;
        }

        case "ArrowRight": {
          if (actions.includes("NEXT") || actions.includes("PASS")) {
            event.preventDefault();
            goToNextQuestion();
          }
          return;
        }

        case "ArrowLeft": {
          if (!(isDisabled || isFirstQuestion)) {
            event.preventDefault();
            goToPreviousQuestion();
          }
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    keyboardShortcutsEnabled,
    openFinishDialog,
    isReady,
    isResult,
    isDisabled,
    currentQuestionId,
    isClassic,
    isTest,
    isLocked,
    actions,
    runtimeCurrentQuestion.status,
    submitPracticeAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    isFirstQuestion,
  ]);

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
              {!isResult && reviewEnabled && (
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
                        disabled={isDisabled || action.includes("_DISABLED")}
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

            <Dialog open={openFinishDialog} onOpenChange={setOpenFinishDialog}>
              <DialogContent className="max-w-sm gap-0 overflow-hidden p-0">
                <div className="space-y-5 p-5">
                  <DialogHeader className="space-y-1 text-left">
                    <DialogTitle className="text-base font-semibold">
                      Finish {isTest ? "test" : "quiz"}?
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-relaxed">
                      {incompleteQuestions.length > 0 ? (
                        <>
                          You have{" "}
                          <span className="font-medium text-foreground">
                            {incompleteQuestions.length} incomplete{" "}
                            {incompleteQuestions.length === 1
                              ? "question"
                              : "questions"}
                          </span>
                          . You can still return to them before finishing.
                        </>
                      ) : (
                        "All questions are complete. You're ready to finish!"
                      )}
                    </DialogDescription>
                  </DialogHeader>

                  {incompleteQuestions.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          {isTest ? "Unanswered" : "Needs attention"}
                        </span>

                        <span className="text-xs tabular-nums text-muted-foreground">
                          {incompleteQuestions.length} remaining
                        </span>
                      </div>

                      <div className="grid grid-cols-7 gap-1.5">
                        {incompleteQuestions.map((question) => {
                          const unevaluated =
                            !isTest &&
                            question.status !== "UNANSWERED" &&
                            !question.evaluation;

                          return (
                            <button
                              key={question.id}
                              type="button"
                              onClick={() =>
                                handleGoToQuestion(question.questionIndex)
                              }
                              aria-label={`Go to question ${question.questionNumber}`}
                              title={
                                unevaluated ? "Not evaluated" : "Unanswered"
                              }
                              className={cn(
                                "flex size-9 items-center justify-center rounded-lg",
                                "border text-xs font-medium tabular-nums",
                                "transition-colors focus-visible:outline-none",
                                "focus-visible:ring-2 focus-visible:ring-ring",
                                unevaluated
                                  ? "border-blue-500/30 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
                                  : "border-amber-500/30 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400",
                              )}
                            >
                              {question.questionNumber}
                            </button>
                          );
                        })}
                      </div>

                      {!isTest && (
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-sm bg-amber-500" />
                            <span className="text-[11px] text-muted-foreground">
                              Unanswered
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-sm bg-blue-500" />
                            <span className="text-[11px] text-muted-foreground">
                              Not evaluated
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="text-[11px] text-muted-foreground">
                        Select a number to return to that question.
                      </p>
                    </div>
                  )}
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
