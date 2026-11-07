"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Gamepad2,
  Layers3,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { useRuntime, useRuntimeActions } from "../store";

export default function QuizReadyPage() {
  const { quizSnapshot, questionCount, startedAt, questions, settings } =
    useRuntime();
  const { startAttempt, resumeAttempt } = useRuntimeActions();

  const { title, description, tags, category, language, thumbnail } =
    quizSnapshot;

  const [expanded, setExpanded] = useState(false);

  // Replace with your actual attempt-resume condition.
  const canResume = startedAt !== null;

  const hasMetadata = Boolean(category || language || tags.length > 0);

  const totalDurationSeconds = settings?.timeLimitEnabled
    ? questions.reduce(
        (total, question) => total + (question.timeLimitSeconds ?? 0),
        0,
      )
    : 0;

  const formatDuration = (seconds: number) => {
    if (seconds <= 0) return "No time limit";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) return `${remainingSeconds}s`;
    if (remainingSeconds === 0) return `${minutes} min`;

    return `${minutes}m ${remainingSeconds}s`;
  };

  const quizDuration = formatDuration(totalDurationSeconds);

  return (
    <div className="flex w-full flex-1 items-center justify-center overflow-y-auto px-4 py-5 sm:px-6">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 flex size-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
            <Gamepad2 size={19} strokeWidth={1.8} />

            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
              <Sparkles size={9} />
            </span>
          </div>

          <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
            {canResume ? "Welcome back" : "Ready when you are"}
          </span>

          {/* Thumbnail + Quiz information */}
          <div className="flex w-full items-center gap-3 rounded-xl border border-border/70 bg-card/60 p-2.5 text-left">
            {thumbnail?.url ? (
              <div className="relative size-[76px] shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={thumbnail.url}
                  alt={thumbnail.alt ?? title ?? "Quiz image"}
                  fill
                  sizes="76px"
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex size-[76px] shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen size={27} strokeWidth={1.6} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="line-clamp-2 text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg">
                {title}
              </h1>

              {description && (
                <div className="mt-1">
                  <p
                    className={`whitespace-pre-line text-[11px] leading-[1.5] text-muted-foreground ${
                      expanded ? "" : "line-clamp-2"
                    }`}
                  >
                    {description}
                  </p>

                  {description && description.length > 110 && (
                    <button
                      type="button"
                      onClick={() => setExpanded((value) => !value)}
                      className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-primary hover:text-primary/80"
                    >
                      {expanded ? "Show less" : "Read more"}
                      <ChevronDown
                        size={11}
                        className={`transition-transform ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metadata */}
        {hasMetadata && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {category && (
              <span className="inline-flex max-w-36 items-center gap-1 rounded-full border border-border/70 px-2 py-1 text-[10px] text-muted-foreground">
                <BookOpen size={11} className="shrink-0" />
                <span className="truncate">{category}</span>
              </span>
            )}

            {language && (
              <span className="rounded-full border border-border/70 px-2 py-1 text-[10px] text-muted-foreground">
                {language}
              </span>
            )}

            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="max-w-28 truncate rounded-full bg-muted/70 px-2 py-1 text-[10px] text-muted-foreground"
              >
                #{tag}
              </span>
            ))}

            {tags.length > 2 && (
              <span className="rounded-full bg-muted/70 px-2 py-1 text-[10px] text-muted-foreground">
                +{tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card/70 px-3 py-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers3 size={16} />
            </div>

            <div>
              <p className="text-sm font-semibold leading-none tabular-nums">
                {questionCount}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card/70 px-3 py-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock3 size={16} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">{quizDuration}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Total duration
              </p>
            </div>
          </div>
        </div>

        {/* Start / Resume / Restart */}
        <div className="mt-4 space-y-2">
          {canResume ? (
            <>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => resumeAttempt(new Date())}
                className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/10 transition-colors hover:bg-primary/90"
              >
                Resume quiz
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => startAttempt(new Date())}
                className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card/60 px-4 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Sparkles size={13} />
                Restart quiz
              </motion.button>

              <p className="text-center text-[10px] text-muted-foreground">
                Continue your progress or start fresh.
              </p>
            </>
          ) : (
            <>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => startAttempt(new Date())}
                className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/10 transition-colors hover:bg-primary/90"
              >
                Start quiz
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.button>

              <p className="text-center text-[10px] text-muted-foreground">
                Take your time. Enjoy the experience.
              </p>
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
}
