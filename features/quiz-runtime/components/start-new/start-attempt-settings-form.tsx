"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ClipboardCheck, Clock3, Eye, Shuffle, Sparkles } from "lucide-react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import type { AttemptSettings, SessionMode } from "../../types/runtime-types";

type StartAttemptSettingsFormProps = {
  mode: SessionMode;
  onModeChange: (mode: SessionMode) => void;
  settings: AttemptSettings;
  onSettingsChange: (settings: AttemptSettings) => void;
  onStart: () => void | Promise<void>;
  isStarting: boolean;
  questionCount: number;
};

export function StartAttemptSettingsForm({
  mode,
  onModeChange,
  settings,
  onSettingsChange,
  onStart,
  isStarting,
  questionCount,
}: StartAttemptSettingsFormProps) {
  const update = <K extends keyof AttemptSettings>(
    key: K,
    value: AttemptSettings[K],
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onStart();
  };

  const sessionOptions: {
    value: SessionMode;
    label: string;
    title: string;
    description: string;
    icon: typeof Sparkles;
  }[] = [
{
  value: "CLASSIC",
  label: "Classic",
  title: "Learn as you play",
  description:
    "Answer questions, get instant feedback, and see how you did along the way. Review each answer and learn from your mistakes.",
  icon: Sparkles,
},
{
  value: "TEST",
  label: "Test",
  title: "Test your knowledge",
  description:
    "Answer all questions without seeing feedback along the way. Once finished, review your answers and see your final results.",
  icon: ClipboardCheck,
},
  ];

  const options = [
    {
      label: "Show explanations",
      icon: Eye,
      key: "showExplanations" as const,
    },
    {
      label: "Shuffle questions",
      icon: Shuffle,
      key: "shuffleQuestions" as const,
    },
    {
      label: "Shuffle answers",
      icon: Shuffle,
      key: "shuffleAnswers" as const,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
      <div className="space-y-5">
        {/* Session mode */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Quiz experience</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {sessionOptions.map((option) => {
              const active = mode === option.value;
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onModeChange(option.value)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-all",
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:bg-muted/50",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={cn(
                        "size-4",
                        active ? "text-primary" : "text-muted-foreground",
                      )}
                    />

                    <span
                      className={cn(
                        "text-sm font-semibold",
                        active && "text-primary",
                      )}
                    >
                      {option.label}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {option.title}
                  </p>
                </button>
              );
            })}
          </div>

          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-lg bg-muted/50 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground"
          >
            {mode === "CLASSIC"
              ? sessionOptions[0].description
              : sessionOptions[1].description}
          </motion.p>
        </section>

        {/* Timer settings */}
        <section className="space-y-3">
          <div className="flex min-h-12 items-center gap-3">
            <Clock3 className="size-4 shrink-0 text-muted-foreground" />

            <div className="flex-1">
              <p className="text-sm font-medium">Time limit</p>
              <p className="text-xs text-muted-foreground">
                Set a duration for your quiz
              </p>
            </div>

            <Switch
              checked={settings.timeLimitEnabled}
              onCheckedChange={(value) => update("timeLimitEnabled", value)}
            />
          </div>

          <AnimatePresence initial={false}>
            {settings.timeLimitEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3">
                  <span className="text-xs text-muted-foreground">
                    Duration
                  </span>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={1440}
                      value={Math.floor(
                        settings.timeLimitSeconds
                          ? settings.timeLimitSeconds / 60
                          : 300,
                      )}
                      onChange={(event) => {
                        const value = event.target.value;
                        const minutes = Number(value);

                        if (!value || !Number.isFinite(minutes)) return;

                        update(
                          "timeLimitSeconds",
                          Math.min(1440, Math.max(1, minutes)) * 60,
                        );
                      }}
                      className="h-8 w-20 text-right"
                    />

                    <span className="text-xs text-muted-foreground">
                      minutes
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Additional settings */}
        <section className="space-y-1 border-t border-border/70 pt-3">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <div
                key={option.key}
                className="flex min-h-12 items-center gap-3 py-2"
              >
                <Icon className="size-4 shrink-0 text-muted-foreground" />

                <span className="flex-1 text-sm font-medium">
                  {option.label}
                </span>

                <Switch
                  checked={settings[option.key]}
                  onCheckedChange={(value) => update(option.key, value)}
                />
              </div>
            );
          })}
        </section>
      </div>

      <Button
        type="submit"
        disabled={isStarting || questionCount === 0}
        className="mt-6 h-11 w-full font-semibold"
      >
        {isStarting ? (
          "Starting..."
        ) : (
          <>
            Start quiz
            <ArrowRight className="ml-2 size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
