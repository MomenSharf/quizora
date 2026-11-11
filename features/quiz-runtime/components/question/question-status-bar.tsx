"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ClockAlert,
  LockKeyhole,
  RotateCcw,
} from "lucide-react";
import { RuntimeQuestion } from "../../types/runtime-types";

type QuestionType = RuntimeQuestion["question"]["type"];

type QuestionStatusConfig = {
  icon?: typeof ClockAlert;
  label: string;
  className?: string;
};

const QUESTION_INSTRUCTIONS: Record<QuestionType, string> = {
  SINGLE_SELECT: "Select one answer",
  MULTIPLE_SELECT: "Select all correct answers",
  TRUE_FALSE: "Select true or false",
  ORDERING: "Arrange the items in the correct order",
  MATCH: "Match the related items",
  TYPE_ANSWER: "Type your answer",
  FILL_BLANK: "Fill in the missing words",
  FLASHCARD: "Review the flashcard",
  RANGE: "Select a value within the range",
  GUESS: "Enter your guess",
  TAP_FIND: "Tap the correct area",
  DROPDOWN: "Select an option",
};

const STATUS_CONFIG: Record<
  "timeout" | "locked",
  QuestionStatusConfig
> = {
  timeout: {
    icon: ClockAlert,
    label: "Time expired",
    className: "text-amber-600 dark:text-amber-500",
  },
  locked: {
    icon: LockKeyhole,
    label: "Answer locked",
    className: "text-muted-foreground",
  },
};

type QuestionStatusBarProps = {
  runtimeQuestion: RuntimeQuestion;
  isTimeout: boolean;
  isLocked: boolean;
  handleClear: () => void;
};

export function QuestionStatusBar({
  runtimeQuestion,
  isTimeout,
  isLocked,
  handleClear,
}: QuestionStatusBarProps) {
  const status = isTimeout
    ? STATUS_CONFIG.timeout
    : isLocked
      ? STATUS_CONFIG.locked
      : null;

  const Icon = status?.icon;

  return (
    <div className="flex min-h-7 items-center justify-between gap-3">
      <AnimatePresence mode="wait">
        {status ? (
          <motion.div
            key={isTimeout ? "timeout" : "locked"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`flex items-center gap-1.5 text-xs font-medium ${status.className}`}
          >
            {Icon && <Icon className="size-3.5" />}
            {status.label}
          </motion.div>
        ) : (
          <motion.div
            key={runtimeQuestion.question.type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground"
          >
            {QUESTION_INSTRUCTIONS[runtimeQuestion.question.type]}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLocked && (
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
  );
}