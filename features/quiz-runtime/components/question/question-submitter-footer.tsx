
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuestionSubmitFooterProps = {
  isLocked: boolean;
  hasAnswer: boolean;
  onSubmit: () => void;
  disabled?: boolean;
  shouldAnimate?: boolean;
};

export default function QuestionSubmitFooter({
  isLocked,
  hasAnswer,
  onSubmit,
  disabled = false,
  shouldAnimate = true,
}: QuestionSubmitFooterProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-3">
      <AnimatePresence mode="wait">
        {isLocked ? (
          <motion.div
            key="submitted"
            initial={shouldAnimate ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            role="status"
          >
            <LockKeyhole className="size-4" />
            Answer submitted
          </motion.div>
        ) : (
          <motion.span
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground"
          >
            {hasAnswer ? "Ready to submit" : "Choose an answer"}
          </motion.span>
        )}
      </AnimatePresence>

      <Button
        size="sm"
        onClick={onSubmit}
        disabled={!hasAnswer || disabled || isLocked}
        className={cn(
          "h-9 gap-2 rounded-lg px-4 shadow-sm",
        )}
      >
        {isLocked ? (
          <>
            Submitted
            <Check className="size-4" />
          </>
        ) : (
          <>
            Submit answer
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </div>
  );
}
