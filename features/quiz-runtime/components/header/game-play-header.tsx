"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { IconLogout, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useRuntimeHeader } from "../../store";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { KeyboardShortcutsEnabledToggle } from "./keyboard-shortcuts-enabled-toggle";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RuntimeSaveIndicator } from "./runtime-save-indicator";
import { useRouter } from "next/navigation";

export default function GamePlayHeader() {
  const router = useRouter();
  const {
    title,
    currentQuestionIndex,
    totalQuestions,
    currentView,
    keyboardShortcutsEnabled,
    setKeyboardShortcutsEnabled,
    mode,
    environment,
    quizId,
  } = useRuntimeHeader();

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

  const isProduction = environment === "PRODUCTION";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-12 items-center justify-between gap-2 px-2 sm:h-14 sm:gap-4 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Logo
            containerClassName="size-8 shrink-0 rounded-lg sm:size-9 sm:rounded-xl"
            iconClassName="size-4 sm:size-[18px]"
            textClassName="hidden text-sm font-bold tracking-tight sm:block"
            disabled={isProduction}
            withChevron={!isProduction}
            handleClick={
              !isProduction
                ? { mode: "Link", href: `/quizzes/${quizId}/editor` }
                : undefined
            }
          />

          <div className="hidden h-7 w-px shrink-0 bg-border sm:block" />

          <div className="flex min-w-0 flex-col items-start gap-1">
            <span className="max-w-[160px] truncate text-xs font-semibold lg:max-w-[220px]">
              {title}
            </span>

            <span
              className={cn(
                "rounded-md px-1 py-0.5 text-[8px] font-semibold uppercase tracking-wide",
                mode === "CLASSIC"
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "bg-violet-500/10 text-violet-600 dark:text-violet-400",
              )}
            >
              {mode}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center px-2">
          {currentView === "REVIEW" && (
            <>
              <h1 className="truncate text-sm font-bold hidden sm:block">
                Review Questions
              </h1>
            </>
          )}
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-1.5">
          <RuntimeSaveIndicator />

          <KeyboardShortcutsEnabledToggle
            keyboardShortcutsEnabled={keyboardShortcutsEnabled}
            onToggle={() =>
              setKeyboardShortcutsEnabled(!keyboardShortcutsEnabled)
            }
          />

          <ThemeToggle />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleFullscreenClick}
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
                className="hidden size-8 shrink-0 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
              >
                {isFullscreen ? (
                  <IconMinimize className="size-4" stroke={1.8} />
                ) : (
                  <IconMaximize className="size-4" stroke={1.8} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            </TooltipContent>
          </Tooltip>

          <div className="mx-0.5 hidden h-5 w-px shrink-0 bg-border sm:block" />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (environment === "PREVIEW") {
                router.push(`/quizzes/${quizId}/editor`);
                return;
              }

              router.push("/");
            }}
            className="h-8 shrink-0 gap-1.5 rounded-lg border-border/70 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
          >
            <IconLogout className="size-3.5" stroke={1.8} />
            <span className="hidden md:inline">
              {environment === "PREVIEW" ? "Back to Editor" : "Exit Quiz"}
            </span>
          </Button>
        </div>
      </div>

      {currentView === "QUESTION" && totalQuestions > 0 && (
        <div className="container mx-auto px-2 sm:px-4">
          <div className="relative h-1 rounded-full bg-muted/70">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />

            <div
              className="absolute top-1/2 z-10 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-bold text-primary-foreground shadow-sm transition-[left] duration-500 ease-out"
              style={{ left: `${progress}%` }}
            >
              {currentQuestionIndex}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
