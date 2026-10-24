
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Layers3,
  Sparkles,
} from "lucide-react";

type QuizReadyCardProps = {
  quizTitle: string;
  description?: string | null;
  questionCount: number;
  duration?: string;
  onStart: () => void;
};

export default function QuizReadyCard({
  quizTitle,
  description,
  questionCount,
  duration = "No time limit",
  onStart,
}: QuizReadyCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen size={19} strokeWidth={2} />
            </div>

            <span className="text-base font-bold tracking-tight">
              Quizora
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
            <Sparkles size={13} />
            Ready to play
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen size={22} strokeWidth={1.8} />
          </div>

          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Your next challenge
          </p>

          <h2 className="mt-1.5 text-xl font-semibold leading-snug tracking-tight">
            {quizTitle}
          </h2>

          {description?.trim() && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="mt-5 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Layers3
              size={16}
              className="text-muted-foreground"
            />
            <span className="text-sm font-medium">
              {questionCount} questions
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <Clock3
              size={16}
              className="shrink-0 text-muted-foreground"
            />
            <span className="truncate text-sm text-muted-foreground">
              {duration}
            </span>
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onStart}
          className="group mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Start quiz
          <ArrowRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </motion.button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Take your time. You’re ready when you are.
        </p>
      </div>
    </motion.section>
  );
}
