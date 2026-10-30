"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  IconMaximize,
  IconMinimize,
  IconSettings2,
  IconX,
} from "@tabler/icons-react";
import { useRuntimeHeader } from "../../store";
import QuizProgress from "./quiz-progress";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type GamePlayHeaderProps = {
  onSettingsClick?: () => void;
  onExitClick?: () => void;
};

export default function GamePlayHeader({
  onSettingsClick,
  onExitClick,
}: GamePlayHeaderProps) {
  const { title,  currentQuestionIndex, totalQuestions, phase } =
    useRuntimeHeader();

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleFullscreenClick = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error("Failed to toggle fullscreen:", error);
    }
  };

  const progress =
    totalQuestions > 0
      ? Math.min(100, (currentQuestionIndex / totalQuestions) * 100)
      : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-12 items-center justify-between gap-2 px-2 sm:h-14 sm:gap-4 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Logo
            containerClassName="size-8 shrink-0 rounded-lg sm:size-9 sm:rounded-xl"
            iconClassName="size-4 sm:size-[18px]"
            textClassName="hidden text-sm font-bold tracking-tight sm:block"
            withChevron
          />

          <div className="hidden h-7 w-px shrink-0 bg-border sm:block" />

          <span className="max-w-[160px] truncate text-xs font-semibold lg:max-w-[220px]">
            {title}
          </span>
        </div>

        <QuizProgress
          phase={phase}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          progress={progress}
        />

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-1.5">
          <ThemeToggle />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            aria-label="Quiz settings"
            className="size-8 shrink-0 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <IconSettings2 className="size-4" stroke={1.8} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleFullscreenClick}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="hidden size-8 shrink-0 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            {isFullscreen ? (
              <IconMinimize className="size-4" stroke={1.8} />
            ) : (
              <IconMaximize className="size-4" stroke={1.8} />
            )}
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
