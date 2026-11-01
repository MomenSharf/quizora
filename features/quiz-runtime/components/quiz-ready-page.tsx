"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Gamepad2,
  Layers3
} from "lucide-react";
import type { QuizSnapshot, SessionMode } from "../types/runtime-types";

type QuizReadyPageProps = {
  quizSnapshot: QuizSnapshot;
  questionCount: number;
  duration?: string;
  onStart: () => void;
};

export default function QuizReadyPage({
  quizSnapshot,
  questionCount,
  duration = "No time limit",
  onStart,
}: QuizReadyPageProps) {
  const { title, description, tags, category, language } = quizSnapshot;

  return (
    <div className="relative flex w-full flex-1 items-center justify-center px-3 py-4 sm:px-5">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`flex size-10 items-center justify-center rounded-xl text-primary bg-primary/10`}
          >
            <Gamepad2 size={21} strokeWidth={1.8} />
          </div>

         

          <h1 className="mt-2 max-w-lg text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>

          {description?.trim() && (
            <p className="mt-2 line-clamp-2 max-w-md text-sm leading-5 text-muted-foreground">
              {description}
            </p>
          )}

          {(category || language || tags.length > 0) && (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {category && (
                <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                  <BookOpen size={12} />
                  {category}
                </span>
              )}

              {language && (
                <span className="rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                  {language}
                </span>
              )}

              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-5 flex max-w-sm divide-x divide-border rounded-xl border border-border/70 bg-card">
          <div className="flex flex-1 items-center justify-center gap-2.5 px-3 py-3">
            <Layers3 size={17} className="text-muted-foreground" />
            <div className="text-left">
              <p className="text-sm font-semibold tabular-nums">
                {questionCount}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {questionCount === 1 ? "Question" : "Questions"}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-2.5 px-3 py-3">
            <Clock3 size={17} className="text-muted-foreground" />
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-semibold">{duration}</p>
              <p className="text-[11px] text-muted-foreground">Duration</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-sm">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
    Start practicing
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.button>

          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Stay focused. Do your best.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
