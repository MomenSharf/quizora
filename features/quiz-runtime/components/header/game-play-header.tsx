"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  IconArrowsDiagonal,
  IconDots,
  IconMaximize,
  IconSettings2,
  IconX,
} from "@tabler/icons-react";
import { useRuntime, useRuntimeStore } from "../../store";
import { useShallow } from "zustand/react/shallow";

type GamePlayHeaderProps = {
  quizTitle?: string;
  currentQuestion?: number;
  totalQuestions?: number;
  onSettingsClick?: () => void;
  onFullscreenClick?: () => void;
  onExitClick?: () => void;
};

export default function GamePlayHeader({
  onSettingsClick,
  onFullscreenClick,
  onExitClick,
}: GamePlayHeaderProps) {
  const { quizTitle, mode, currentQuestionIndex, totalQuestions } =
    useRuntimeStore(
      useShallow((state) => ({
        quizTitle: state.quizTitle,
        mode: state.mode,
        currentQuestionIndex: state.questionState.currentIndex + 1,
        totalQuestions: state.questions.length,
      })),
    );

  const progress =
    totalQuestions > 0
      ? Math.min(100, (currentQuestionIndex / totalQuestions) * 100)
      : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Logo
            containerClassName="size-9 shrink-0 rounded-xl"
            iconClassName="size-[18px]"
            textClassName="text-base font-bold tracking-tight"
            withChevron
            
          />

          <div className="hidden h-8 w-px bg-border sm:block" />

          <div className="hidden min-w-0 flex-col gap-0.5 sm:flex">
            <span className="max-w-[240px] truncate text-sm font-semibold">
              {quizTitle}
            </span>
            <span className="text-xs text-muted-foreground">
              {mode === "PRACTICE" ? "Practice mode" : "Test mode"}
            </span>
          </div>
        </div>

        <div className="flex w-auto shrink-0 items-center gap-3 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-medium tabular-nums">
              <span className="text-foreground">{currentQuestionIndex}</span>
              <span className="text-muted-foreground">/ {totalQuestions}</span>
            </div>

            <div
              className="h-1 w-36 overflow-hidden rounded-full bg-muted sm:w-56 lg:w-64"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={totalQuestions}
              aria-valuenow={Math.min(currentQuestionIndex, totalQuestions)}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            aria-label="Quiz settings"
            className="size-9 rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconSettings2 className="size-[18px]" stroke={1.8} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onFullscreenClick}
            aria-label="Toggle fullscreen"
            className="hidden size-9 rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <IconMaximize  className="size-[18px]" stroke={1.8} />
          </Button>

          <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onExitClick}
            className="h-9 gap-2 rounded-xl border-border/70 px-3 text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
          >
            <IconX className="size-4" stroke={1.8} />
            <span className="hidden sm:inline">Exit Quiz</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
