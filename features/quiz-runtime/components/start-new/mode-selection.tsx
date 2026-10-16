
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ClipboardCheck } from "lucide-react";

import type { SessionMode } from "../../types/runtime-types";

type ModeSelectionProps = {
  quizTitle: string;
  questionCount: number;
  onSelectMode: (mode: SessionMode) => void;
};

const modes = [
  {
    id: "PRACTICE" as const,
    title: "Practice",
    description: "Learn at your own pace.",
    icon: BookOpen,
    number: "01",
  },
  {
    id: "TEST" as const,
    title: "Test",
    description: "Put your knowledge to the test.",
    icon: ClipboardCheck,
    number: "02",
  },
];

export function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden p-4 ">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.045] blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 mb-8 text-center sm:mb-10"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          YOUR EXPERIENCE
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How would you like to{" "}
          <span className="text-primary">play?</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Choose your style. Make every question count.
        </p>
      </motion.div>

      <div className="relative z-10 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {modes.map((mode, index) => {
          const Icon = mode.icon;

          return (
            <motion.button
              key={mode.id}
              type="button"
              onClick={() => onSelectMode(mode.id)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 + index * 0.12 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative isolate flex min-h-[230px] flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-6 text-left shadow-sm backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-h-[260px] sm:p-7"
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-primary/[0.08] blur-3xl"
                animate={{
                  x: [0, -25, 12, 0],
                  y: [0, 20, 35, 0],
                  scale: [1, 1.18, 0.92, 1],
                }}
                transition={{
                  duration: 10 + index * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-20 -z-10 size-64 rounded-full bg-primary/[0.06] blur-3xl"
                animate={{
                  x: [0, 35, -10, 0],
                  y: [0, -20, -35, 0],
                  scale: [1, 0.9, 1.2, 1],
                }}
                transition={{
                  duration: 12 + index * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 top-16 -z-10 size-32 rotate-45 rounded-[32px] border border-primary/10 bg-primary/[0.025] transition-transform duration-700 group-hover:rotate-[75deg] group-hover:scale-125"
              />

              <div className="flex items-start justify-between">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 260, damping: 12 }}
                  className="flex size-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <Icon className="size-5" />
                </motion.div>

                <span className="font-mono text-xs tracking-widest text-muted-foreground/50 transition-colors group-hover:text-primary">
                  {mode.number}
                </span>
              </div>

              <div className="mt-auto pt-10">
                <h2 className="text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {mode.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {mode.description}
                </p>
              </div>

              <div className="absolute bottom-6 right-6 flex size-9 items-center justify-center rounded-full border border-border/80 bg-background/70 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="size-4" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="relative z-10 mt-7 text-xs text-muted-foreground"
      >
        Pick a mode to customize your experience
      </motion.p>
    </section>
  );
}
