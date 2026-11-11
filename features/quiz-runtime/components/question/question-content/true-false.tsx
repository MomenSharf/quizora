"use client";

import { useRuntimeActions } from "@/features/quiz-runtime/store";
import { cn } from "@/lib/utils";
import { IconCheck, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ClockAlert,
} from "lucide-react";
import { QuestionContentRouterProps } from "../question-content-router";

export default function TrueFalseContent({
  runtimeQuestion,
  isLocked,
  isSubmitted,
  isTimeout,
  shouldAnimateFeedback,
}: QuestionContentRouterProps) {
  const { question, answer } = runtimeQuestion;
  const { setAnswer } = useRuntimeActions();

  if (question.type !== "TRUE_FALSE") return null;

  const selectedValue =
    answer?.type === "TRUE_FALSE" ? answer.value : null;

  const correctValue = question.content.correctAnswer;

  const options = [
    { value: true, label: "True", icon: IconCheck },
    { value: false, label: "False", icon: IconX },
  ];

  const handleSelect = (value: boolean) => {
    if (isLocked || selectedValue === value) return;

    setAnswer(runtimeQuestion.id, {
      type: "TRUE_FALSE",
      value,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const selected = selectedValue === option.value;

        const correct =
          isSubmitted && option.value === correctValue;

        const incorrect =
          isSubmitted && !isTimeout && selected && !correct;

        const timedOutSelection =
          isTimeout && selected && !correct;

        return (
          <motion.button
            key={String(option.value)}
            type="button"
            disabled={isLocked}
            onClick={() => handleSelect(option.value)}
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
              scale: {
                type: "spring",
                stiffness: 350,
                damping: 24,
              },
              x: { duration: 0.35, ease: "easeOut" },
              opacity: { duration: 0.3 },
            }}
            whileTap={!isLocked ? { scale: 0.985 } : undefined}
            className={cn(
              "group relative flex min-h-28 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-2 p-4",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              "disabled:cursor-not-allowed",

              correct && "border-emerald-500/70 bg-emerald-500/10",

              incorrect && "border-destructive/70 bg-destructive/5",

              timedOutSelection && "border-amber-500/70 bg-amber-500/10",

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
                  className="absolute inset-0 origin-left bg-emerald-500/[0.04]"
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
                "relative z-10 flex size-11 items-center justify-center rounded-xl transition-colors",

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
                    <IconCheck size={22} stroke={2.5} />
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
                    <IconX size={22} stroke={2.5} />
                  </motion.span>
                ) : (
                  <motion.span key="icon">
                    <option.icon size={22} stroke={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>

            <span className="relative z-10 text-base font-semibold">
              {option.label}
            </span>

            <AnimatePresence>
              {selected && !isSubmitted && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-3 top-3 size-2 rounded-full bg-primary"
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
                  className="absolute right-3 top-3 z-10"
                >
                  <CheckCircle2 className="size-5 text-emerald-600" />
                </motion.span>
              )}

              {timedOutSelection && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute right-3 top-3 z-10"
                >
                  <ClockAlert className="size-5 text-amber-600" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}