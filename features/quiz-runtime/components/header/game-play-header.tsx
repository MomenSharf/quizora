
"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  IconMaximize,
  IconSettings2,
  IconX,
} from "@tabler/icons-react";
import { useRuntimeStore } from "../../store";
import { useShallow } from "zustand/react/shallow";

type GamePlayHeaderProps = {
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
      <div className="mx-auto flex h-12 container items-center justify-between gap-2 sm:h-14 sm:gap-4 ">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Logo
            containerClassName="size-8 shrink-0 rounded-lg sm:size-9 sm:rounded-xl"
            iconClassName="size-4 sm:size-[18px]"
            textClassName="hidden text-sm font-bold tracking-tight sm:block"
            withChevron
          />

          <div className="hidden h-7 w-px shrink-0 bg-border sm:block" />

          <div className="hidden min-w-0 flex-col gap-0 sm:flex">
            <span className="max-w-[160px] truncate text-xs font-semibold lg:max-w-[220px]">
              {quizTitle}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {mode === "PRACTICE" ? "Practice mode" : "Test mode"}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-[0.8] items-center justify-center sm:flex-1">
          <div className="flex w-full max-w-[240px] min-w-0 flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-[11px] font-medium leading-none tabular-nums sm:text-xs">
              <span className="text-foreground">
                Question {currentQuestionIndex + 1}
              </span>
              <span className="text-muted-foreground">
                of {totalQuestions}
              </span>
            </div>

            <div
              className="h-1 w-full overflow-hidden rounded-full bg-muted"
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

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            aria-label="Quiz settings"
            className="size-8 shrink-0 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground sm:size-8"
          >
            <IconSettings2 className="size-4" stroke={1.8} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onFullscreenClick}
            aria-label="Toggle fullscreen"
            className="hidden size-8 shrink-0 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <IconMaximize className="size-4" stroke={1.8} />
          </Button>

          <div className="mx-0.5 hidden h-5 w-px shrink-0 bg-border sm:block" />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onExitClick}
            className="h-8 shrink-0 gap-1 rounded-lg border-border/70 px-2 text-xs text-muted-foreground hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive sm:gap-1.5"
          >
            <IconX className="size-3.5" stroke={1.8} />
            <span className="hidden md:inline">Exit Quiz</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
