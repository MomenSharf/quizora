"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Eye,
  Shuffle,
  Sparkles,
} from "lucide-react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import type {
  AttemptSettings,
  SessionMode,
} from "../../types/runtime-types";

type StartAttemptSettingsFormProps = {
  mode: SessionMode;
  onModeChange: (settings: SessionMode) => void;
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

  const selectmode = (mode: SessionMode) => {
    onModeChange(mode);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onStart();
  };

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

  const sessionOptions: {
    value: SessionMode;
    label: string;
    description: string;
  }[] = [
    {
      value: "STANDARD",
      label: "Standard",
      description: "Play at your own pace",
    },
    {
      value: "REVIEW",
      label: "Review",
      description: "Check answers before submitting",
    },
    {
      value: "TIMED",
      label: "Timed",
      description: "Complete the quiz within a time limit",
    },
  ];

  const isTimed = mode === "TIMED";

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
      <div className="space-y-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Quiz experience</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {sessionOptions.map((option) => {
              const active = mode === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectmode(option.value)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-colors",
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:bg-muted/50",
                  )}
                >
                  <span
                    className={cn(
                      "block text-sm font-semibold",
                      active && "text-primary",
                    )}
                  >
                    {option.label}
                  </span>

                  <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2.5"
          >
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />

            <p className="text-xs leading-relaxed text-muted-foreground">
              {mode === "STANDARD" &&
                "Standard gameplay. No review or time limit is enabled."}

              {mode === "REVIEW" &&
                "Review is enabled. You'll check your answers before submitting."}

              {mode === "TIMED" &&
                "Timed gameplay. Complete the quiz within your selected time limit."}
            </p>
          </motion.div>
        </div>

        {isTimed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl bg-muted/50 p-3"
          >
            <div className="flex items-center gap-3">
              <Clock3 className="size-4 text-primary" />
              <span className="flex-1 text-sm font-medium">Time limit</span>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-border/60 pt-3">
              <span className="flex-1 text-xs text-muted-foreground">
                Duration
              </span>

              <Input
                type="number"
                min={1}
                max={1440}
                value={
                  settings.timeLimitSeconds === null
                    ? ""
                    : settings.timeLimitSeconds / 60
                }
                placeholder="Unlimited"
                onChange={(event) => {
                  const value = event.target.value;

                  if (!value) {
                    update("timeLimitSeconds", null);
                    return;
                  }

                  const minutes = Number(value);

                  if (!Number.isFinite(minutes)) return;

                  update(
                    "timeLimitSeconds",
                    Math.min(1440, Math.max(1, minutes)) * 60,
                  );
                }}
                className="h-8 w-24 text-right"
              />

              <span className="text-xs text-muted-foreground">min</span>
            </div>
          </motion.div>
        )}

        <div className="space-y-1">
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
        </div>
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