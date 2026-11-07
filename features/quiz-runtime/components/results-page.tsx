"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock3,
  Flag,
  RotateCcw,
  Target,
  XCircle,
  Zap,
} from "lucide-react";

import { useResults } from "../store";
import { Button } from "@/components/ui/button";

type ResultsPageProps = {
  onRetry: () => void;
  onDashboard: () => void;
  onReviewQuestion?: (questionId: string) => void;
};

export default function ResultsPage({
  onRetry,
  onDashboard,
  onReviewQuestion,
}: ResultsPageProps) {
  const results = useResults();

  const {
    quizSnapshot,
    allQuestions,
    totalCount,
    answeredCount,
    unansweredCount,
    correctCount,
    partiallyCorrectCount,
    incorrectCount,
    timedOutCount,
    earnedPoints,
    maxPoints,
    percentage,
    accuracy,
    formattedDuration,
    performance,
    isTest,
    timerEnabled,
  } = results;

  const scoreColor =
    percentage >= 75
      ? "text-emerald-600 dark:text-emerald-400"
      : percentage >= 50
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";

  const scoreStroke =
    percentage >= 75 ? "#10b981" : percentage >= 50 ? "#f59e0b" : "#f43f5e";

  const circumference = 2 * Math.PI * 42;
  const progress =
    (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  const getQuestionStatus = (question: (typeof allQuestions)[number]) => {
    if (question.status === "TIMED_OUT") {
      return {
        label: "Timed out",
        color: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
        icon: Clock3,
      };
    }

    if (question.evaluation?.outcome === "CORRECT") {
      return {
        label: "Correct",
        color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        icon: CheckCircle2,
      };
    }

    if (question.evaluation?.outcome === "PARTIALLY_CORRECT") {
      return {
        label: "Partial",
        color: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
        icon: Target,
      };
    }

    if (question.evaluation?.outcome === "INCORRECT") {
      return {
        label: "Incorrect",
        color: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
        icon: XCircle,
      };
    }

    return {
      label: "Unanswered",
      color: "bg-muted text-muted-foreground",
      icon: Flag,
    };
  };

  const getQuestionTitle = (question: (typeof allQuestions)[number]) => {
    const data = question.question as Record<string, unknown>;

    return String(
      data.prompt ??
        data.title ??
        data.text ??
        `Question ${question.orderIndex + 1}`,
    );
  };

  const stats = [
    {
      label: "Correct",
      value: correctCount,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Incorrect",
      value: incorrectCount,
      icon: XCircle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      label: "Unanswered",
      value: unansweredCount,
      icon: Flag,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Answered",
      value: answeredCount,
      icon: Check,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  const breakdown = [
    {
      label: "Correct",
      value: correctCount,
      color: "bg-emerald-500",
    },
    {
      label: "Partially correct",
      value: partiallyCorrectCount,
      color: "bg-amber-500",
    },
    {
      label: "Incorrect",
      value: incorrectCount,
      color: "bg-rose-500",
    },
    {
      label: "Unanswered",
      value: unansweredCount,
      color: "bg-muted-foreground/40",
    },
  ];

  const metrics = [
    {
      label: "Points earned",
      value: `${earnedPoints} / ${maxPoints}`,
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
    },
    {
      label: "Time spent",
      value: formattedDuration,
      icon: Clock3,
    },
    {
      label: timerEnabled ? "Timed out" : "Completion",
      value: timerEnabled
        ? String(timedOutCount)
        : `${answeredCount}/${totalCount}`,
    },
  ];

  return (
    <main className="min-h-dvh bg-background px-3 py-4 text-foreground sm:px-6 sm:py-6">
      <div className="mx-auto max-w-5xl space-y-4 sm:space-y-5">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={onDashboard}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Dashboard
          </button>

          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            {isTest ? "Test results" : "Quiz results"}
          </span>
        </header>

        {/* Score overview */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award size={15} />
                </span>

                <span className="text-xs font-semibold text-primary">
                  Quiz completed
                </span>
              </div>

              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {performance.label}
              </h1>

              <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {performance.description}
              </p>

              <div className="mt-3 min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {quizSnapshot.title}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {totalCount} questions
                  {" · "}
                  {isTest ? "Test" : "Classic"}
                  {timerEnabled ? " · Timed" : ""}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={onRetry} className="gap-1.5">
                  <RotateCcw size={14} />
                  Try again
                </Button>

                <Button
                  variant="outline"
                  onClick={onDashboard}
                  className="gap-1.5"
                >
                  Dashboard
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>

            {/* Score circle */}
            <div className="flex shrink-0 items-center justify-center gap-4 sm:pr-4">
              <div className="relative flex size-28 items-center justify-center">
                <svg
                  className="-rotate-90"
                  viewBox="0 0 100 100"
                  aria-label={`Final score: ${percentage}%`}
                  role="img"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    className="stroke-muted"
                    strokeWidth="7"
                  />

                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={scoreStroke}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{
                      strokeDashoffset: circumference - progress,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                  />
                </svg>

                <div className="absolute text-center">
                  <p
                    className={`text-2xl font-bold tracking-tight tabular-nums ${scoreColor}`}
                  >
                    {percentage}%
                  </p>

                  <p className="text-[10px] font-medium text-muted-foreground">
                    Final score
                  </p>
                </div>
              </div>

              <div className="hidden sm:block">
                <p className="text-xs text-muted-foreground">Points earned</p>

                <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
                  {earnedPoints}
                  <span className="text-sm font-medium text-muted-foreground">
                    {" "}
                    / {maxPoints}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Statistics */}
        <section className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${item.bg}`}
              >
                <item.icon size={17} className={item.color} />
              </div>

              <div className="min-w-0">
                <p className="text-xl font-bold leading-6 tabular-nums">
                  {item.value}
                </p>

                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Performance details */}
        <section className="grid gap-3 md:grid-cols-2">
          {/* Breakdown */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <Target size={16} className="text-primary" />

              <h2 className="text-sm font-semibold">Performance breakdown</h2>
            </div>

            <div className="space-y-3.5">
              {breakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>

                    <span className="font-semibold tabular-nums text-foreground">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          totalCount ? (item.value / totalCount) * 100 : 0
                        }%`,
                      }}
                      transition={{ duration: 0.7 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional metrics */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <Zap size={16} className="text-primary" />

              <h2 className="text-sm font-semibold">Your performance</h2>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {metrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border/60 bg-muted/40 p-3"
                >
                  <p className="text-[11px] text-muted-foreground">
                    {item.label}
                  </p>

                  <p className="mt-1.5 flex items-center gap-1.5 text-lg font-bold tabular-nums text-foreground">
                    {item.icon && (
                      <item.icon size={15} className="shrink-0 text-primary" />
                    )}

                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Question review */}
        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">Question review</h2>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Review your answers and results
              </p>
            </div>

            <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
              {totalCount} questions
            </span>
          </div>

          <div className="divide-y divide-border">
            {allQuestions.map((question, index) => {
              const status = getQuestionStatus(question);
              const StatusIcon = status.icon;

              return (
                <motion.button
                  key={question.id}
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: Math.min(index * 0.02, 0.3),
                  }}
                  onClick={() => onReviewQuestion?.(question.id)}
                  disabled={!onReviewQuestion}
                  className="group flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-muted/50 disabled:cursor-default disabled:hover:bg-transparent"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div
                      className="line-clamp-2 text-xs font-medium text-foreground [&_p]:inline [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4"
                      dangerouslySetInnerHTML={{
                        __html: getQuestionTitle(question),
                      }}
                    />

                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {question.earnedPoints ?? 0}
                      {" / "}
                      {question.maxPoints ?? 0} points
                      {timerEnabled &&
                        question.timeSpentSeconds != null &&
                        ` · ${question.timeSpentSeconds}s`}
                    </p>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold ${status.color}`}
                  >
                    <StatusIcon size={12} />
                    <span className="hidden sm:inline">{status.label}</span>
                  </span>

                  {onReviewQuestion && (
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-border pt-3 pb-2">
          <span className="text-xs text-muted-foreground">
            Quiz completed · {totalCount} questions
          </span>

          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            <RotateCcw size={13} />
            Try again
          </button>
        </footer>
      </div>
    </main>
  );
}
