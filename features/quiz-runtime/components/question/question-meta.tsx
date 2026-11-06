"use client";

import { useEffect, useRef, useState } from "react";
import { QUESTION_TYPE_MAP } from "@/features/quiz-editor/constants/question-types";
import type { RuntimeQuestion } from "@/features/quiz-runtime/types/runtime-types";
import {
  IconAlertTriangle,
  IconClock,
  IconHourglass,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { useRuntimeActions } from "../../store";

type QuestionMetaProps = {
  runtimeQuestion: RuntimeQuestion;
};

type TimerState = "normal" | "warning" | "critical" | "expired";

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

function getTimerState(timeLeft: number, totalTime: number): TimerState {
  if (timeLeft <= 0) return "expired";
  if (timeLeft <= totalTime * 0.1) return "critical";
  if (timeLeft <= totalTime * 0.2) return "warning";

  return "normal";
}

const TIMER_STYLES: Record<
  TimerState,
  { container: string; icon: string; text: string; progress: string }
> = {
  normal: {
    container: "border-border/70 bg-muted/40",
    icon: "text-muted-foreground",
    text: "text-foreground",
    progress: "bg-primary",
  },
  warning: {
    container: "border-amber-500/25 bg-amber-500/5",
    icon: "text-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    progress: "bg-amber-500",
  },
  critical: {
    container: "border-red-500/25 bg-red-500/5",
    icon: "text-red-500",
    text: "text-red-600 dark:text-red-400",
    progress: "bg-red-500",
  },
  expired: {
    container: "border-red-500/25 bg-red-500/5",
    icon: "text-red-500",
    text: "text-red-600 dark:text-red-400",
    progress: "bg-red-500",
  },
};

export default function QuestionMeta({ runtimeQuestion }: QuestionMetaProps) {
  const { timeoutQuestion } = useRuntimeActions();

  const questionType = QUESTION_TYPE_MAP[runtimeQuestion.question.type];
  const [now, setNow] = useState(() => new Date());
  const timeoutTriggered = useRef(false);

  const { id, startedAt, deadlineAt, isQuestionTimerRunning, locked, status } =
    runtimeQuestion;

  const timerEnabled = startedAt !== null && deadlineAt !== null;

  const timerActive =
    timerEnabled &&
    isQuestionTimerRunning &&
    !locked &&
    status === "UNANSWERED";

  useEffect(() => {
    if (!timerActive) return;

    const update = () => setNow(new Date());

    update();

    const interval = window.setInterval(update, 1000);

    return () => window.clearInterval(interval);
  }, [id, deadlineAt, timerActive]);


  const timeLeft = timerEnabled
    ? Math.max(0, Math.ceil((deadlineAt.getTime() - now.getTime()) / 1000))
    : 0;

  const totalTime = timerEnabled
    ? Math.max(
        1,
        Math.ceil((deadlineAt.getTime() - startedAt.getTime()) / 1000),
      )
    : 1;

  const timerState = getTimerState(timeLeft, totalTime);
  const styles = TIMER_STYLES[timerState];

  useEffect(() => {
    if (!timerActive || timeLeft > 0 || timeoutTriggered.current) return;

    timeoutTriggered.current = true;
    timeoutQuestion(id, new Date());
  }, [id, timerActive, timeLeft, timeoutQuestion]);

  useEffect(() => {
    timeoutTriggered.current = false;
  }, [id, deadlineAt]);

  if (!questionType) return null;

  const QuestionIcon = questionType.icon;
  const TimerIcon =
    timerState === "critical" || timerState === "expired"
      ? IconAlertTriangle
      : IconClock;

  const progress = Math.min(100, Math.max(0, (timeLeft / totalTime) * 100));

  const showTimeout = status === "TIMED_OUT";
  const showTimer = timerEnabled && !locked && !showTimeout;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div
        className="inline-flex h-8 items-center gap-2 rounded-lg border px-2.5"
        style={{
          color: questionType.color,
          backgroundColor: `color-mix(in srgb, ${questionType.color} 9%, transparent)`,
          borderColor: `color-mix(in srgb, ${questionType.color} 22%, transparent)`,
        }}
      >
        <QuestionIcon size={15} stroke={"1.8"} />
        <span className="text-xs font-semibold">{questionType.shortLabel}</span>
      </div>

      {showTimeout ? (
        <div className="inline-flex h-8 items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/5 px-3 text-red-600 dark:text-red-400">
          <IconHourglass size={15} stroke={1.8} />
          <span className="text-xs font-semibold">Time is up</span>
        </div>
      ) : (
        showTimer && (
          <div
            role="timer"
            aria-live="off"
            aria-label={`${timeLeft} seconds remaining`}
            className={cn(
              "relative inline-flex h-8 items-center gap-2 overflow-hidden rounded-lg border px-3 transition-colors duration-300",
              styles.container,
            )}
          >
            <TimerIcon size={15} stroke={1.8} className={styles.icon} />

            <span
              className={cn(
                "min-w-[42px] font-mono text-xs font-bold tabular-nums tracking-wide",
                styles.text,
              )}
            >
              {formatTime(timeLeft)}
            </span>

            <span
              className={cn(
                "size-1.5 rounded-full",
                timerState === "critical"
                  ? "animate-pulse bg-red-500"
                  : timerState === "warning"
                    ? "bg-amber-500"
                    : "bg-emerald-500",
              )}
            />

            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-border/40">
              <div
                className={cn(
                  "h-full transition-[width] duration-1000 ease-linear",
                  styles.progress,
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
