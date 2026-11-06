
"use client";

import { useRuntimeActions } from "@/features/quiz-runtime/store";
import { cn } from "@/lib/utils";
import { IconCheck, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  LockKeyhole,
  RotateCcw,
  ClockAlert,
} from "lucide-react";
import { QuestionContentRouterProps } from "../question-content-router";

export default function SingleSelectContent({
  runtimeQuestion,
}: QuestionContentRouterProps) {
  const { question, answer, evaluation } = runtimeQuestion;
  const { setAnswer, clearAnswer } = useRuntimeActions();

  if (question.type !== "SINGLE_SELECT") return null;

  const selectedOptionId =
    answer?.type === "SINGLE_SELECT" ? answer.optionId : null;

  const { options, correctOptionId } = question.content;

  const isLocked = runtimeQuestion.locked;
  const isSubmitted = evaluation !== null;
  const isTimeout = evaluation?.outcome === "TIMEOUT";
  const shouldAnimateFeedback = !runtimeQuestion.hasSeenFeedback;

  const handleSelect = (optionId: string) => {
    if (isLocked || selectedOptionId === optionId) return;

    setAnswer(runtimeQuestion.id, {
      type: "SINGLE_SELECT",
      optionId,
    });
  };

  const handleClear = () => {
    if (isLocked || !selectedOptionId) return;
    clearAnswer(runtimeQuestion.id);
  };

  return (
    <div className="flex flex-col gap-3 px-1">
      {/* Question status */}
      <div className="flex min-h-7 items-center justify-between gap-3">
        <AnimatePresence mode="wait">
          {isTimeout ? (
            <motion.div
              key="timeout"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-500"
            >
              <ClockAlert className="size-3.5" />
              Time expired
            </motion.div>
          ) : isLocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
            >
              <LockKeyhole className="size-3.5" />
              Answer locked
            </motion.div>
          ) : (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-muted-foreground"
            >
              Select one answer
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLocked && selectedOptionId && (
            <motion.button
              key="clear"
              type="button"
              initial={{ opacity: 0, scale: 0.9, x: 5 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 5 }}
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              Clear answer
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option, index) => {
          const selected = selectedOptionId === option.id;
          const correct = isSubmitted && option.id === correctOptionId;

          // A timeout is not a normal incorrect submission.
          const incorrect =
            isSubmitted &&
            !isTimeout &&
            selected &&
            !correct;

          const timedOutSelection =
            isTimeout && selected && !correct;

          return (
            <motion.button
              key={option.id}
              type="button"
              disabled={isLocked}
              onClick={() => handleSelect(option.id)}
              aria-pressed={selected}
              initial={false}
              animate={{
                scale: selected ? 1.015 : 1,
                x:
                  incorrect && shouldAnimateFeedback
                    ? [0, -5, 5, -3, 3, 0]
                    : 0,
                opacity:
                  isSubmitted && !correct && !selected ? 0.55 : 1,
              }}
              transition={{
                scale: { type: "spring", stiffness: 350, damping: 24 },
                x: { duration: 0.35, ease: "easeOut" },
                opacity: { duration: 0.3 },
              }}
              whileTap={!isLocked ? { scale: 0.985 } : undefined}
              className={cn(
                "group relative flex min-h-14 items-center gap-3 overflow-hidden rounded-xl border p-3 text-left",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                "disabled:cursor-not-allowed",

                correct && "border-emerald-500/70 bg-emerald-500/10",

                incorrect && "border-destructive/70 bg-destructive/5",

                timedOutSelection &&
                  "border-amber-500/70 bg-amber-500/10",

                selected &&
                  !isSubmitted &&
                  "border-primary bg-primary/5 ring-1 ring-primary/20",

                !selected &&
                  !isSubmitted &&
                  "border-border bg-card hover:border-primary/40 hover:bg-muted/40",

                isSubmitted &&
                  !correct &&
                  !incorrect &&
                  !timedOutSelection &&
                  "border-border bg-card",
              )}
            >
              <AnimatePresence>
                {correct && (
                  <motion.div
                    initial={
                      shouldAnimateFeedback
                        ? { scaleX: 0, opacity: 0 }
                        : false
                    }
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 w-full origin-left bg-emerald-500/[0.04]"
                  />
                )}
              </AnimatePresence>

              <motion.span
                initial={false}
                animate={{
                  scale:
                    (correct || incorrect || timedOutSelection) &&
                    shouldAnimateFeedback
                      ? [1, 1.18, 1]
                      : 1,
                }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors",

                  correct && "bg-emerald-500 text-white",

                  incorrect && "bg-destructive text-white",

                  timedOutSelection && "bg-amber-500 text-white",

                  selected &&
                    !isSubmitted &&
                    "bg-primary text-primary-foreground",

                  !selected &&
                    !isSubmitted &&
                    "bg-muted text-muted-foreground group-hover:bg-primary/10",

                  !selected &&
                    isSubmitted &&
                    !correct &&
                    "bg-muted text-muted-foreground",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {correct ? (
                    <motion.span
                      key="correct"
                      initial={
                        shouldAnimateFeedback
                          ? { scale: 0, rotate: -45 }
                          : false
                      }
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                    >
                      <IconCheck size={17} stroke={2.5} />
                    </motion.span>
                  ) : incorrect ? (
                    <motion.span
                      key="incorrect"
                      initial={
                        shouldAnimateFeedback
                          ? { scale: 0, rotate: 45 }
                          : false
                      }
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                    >
                      <IconX size={17} stroke={2.5} />
                    </motion.span>
                  ) : (
                    <motion.span key="letter">
                      {String.fromCharCode(65 + index)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>

              <span className="relative z-10 flex-1 text-sm font-medium leading-relaxed">
                {option.text}
              </span>

              <AnimatePresence>
                {selected && !isSubmitted && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative z-10 size-2 shrink-0 rounded-full bg-primary"
                  />
                )}

                {correct && (
                  <motion.span
                    initial={
                      shouldAnimateFeedback
                        ? { scale: 0, opacity: 0, rotate: -30 }
                        : false
                    }
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 350 }}
                    className="relative z-10"
                  >
                    <CheckCircle2 className="size-5 text-emerald-600" />
                  </motion.span>
                )}

                {timedOutSelection && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10"
                  >
                    <ClockAlert className="size-5 text-amber-600" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
