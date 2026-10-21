"use client";

import { Button } from "@/components/ui/button";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { useRuntimeActions, useRuntimeQuestions } from "../../store";

type GamePlayActionsProps = {
  onOpenQuestionList?: () => void;
  disabled?: boolean;
};

export default function GamePlayActions({
  onOpenQuestionList,
  disabled = false,
}: GamePlayActionsProps) {
  const {
    currentQuestionId,
    isFirstQuestion,
    isLastQuestion,
    flaggedQuestionIds,
  } = useRuntimeQuestions();

  const { goToNextQuestion, goToPreviousQuestion, toggleQuestionFlag } =
    useRuntimeActions();

  const isMarkedForReview =
    currentQuestionId !== null &&
    flaggedQuestionIds.includes(currentQuestionId);

  return (
    <footer className="border-t border-border/60 bg-background/85 backdrop-blur-xl flex justify-center">
        <div className="flex h-14 container items-center justify-between gap-2 sm:h-16 sm:gap-4">
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

          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                if (currentQuestionId) {
                  toggleQuestionFlag(currentQuestionId);
                }
              }}
              disabled={disabled || !currentQuestionId}
              aria-pressed={isMarkedForReview}
              className={`h-9 gap-1 rounded-lg px-2 text-xs hover:bg-muted sm:gap-1.5 sm:px-3 ${
                isMarkedForReview
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <IconBookmark
                className="size-4"
                stroke={1.8}
                fill={isMarkedForReview ? "currentColor" : "none"}
              />
              <span className="hidden sm:inline">
                {isMarkedForReview ? "Marked for review" : "Mark for review"}
              </span>
              <span className="sm:hidden">
                {isMarkedForReview ? "Marked" : "Review"}
              </span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onOpenQuestionList}
              disabled={disabled}
              aria-label="Open question list"
              className="h-9 gap-1 rounded-lg px-2 text-xs hover:bg-muted sm:gap-1.5 sm:px-3"
            >
              <IconLayoutGrid className="size-4" stroke={1.8} />
              <span className="hidden sm:inline">Revie qestions</span>
            </Button>
          </div>

          <Button
            type="button"
            onClick={goToNextQuestion}
            disabled={disabled || isLastQuestion}
            className="h-9 shrink-0 gap-1 rounded-lg px-3 text-xs sm:gap-1.5 sm:px-4"
          >
            <span>Next</span>
            <IconArrowRight className="size-4" stroke={1.8} />
          </Button>
        </div>
    </footer>
  );
}
