"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Clock3,
  Eye,
  ListOrdered,
  Loader2,
  Shuffle
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import type { AttemptSettings, SessionMode } from "../../types/runtime-types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";



type StartAttemptSettingsFormProps = {
  quizTitle: string;
  questionCount: number;
  mode: SessionMode;
  settings: AttemptSettings;
  onModeChange: (mode: SessionMode) => void;
  onSettingsChange: (settings: AttemptSettings) => void;
  onStart: () => void | Promise<void>;
  isStarting: boolean;
};

function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: typeof ListOrdered;
  children: ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 border-b border-border/60 px-5 py-5 sm:px-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 space-y-1">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-sm leading-5">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="divide-y divide-border/60 p-0">
        {children}
      </CardContent>
    </Card>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="flex items-center justify-between gap-5 px-5 py-4 sm:px-6">
      <div className="min-w-0 space-y-1">
        <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
          {title}
        </Label>
        <p className="text-sm leading-5 text-muted-foreground">{description}</p>
      </div>

      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="shrink-0"
      />
    </div>
  );
}

function SettingSelect({
  title,
  description,
  value,
  options,
  onChange,
}: {
  title: string;
  description: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="min-w-0 space-y-1">
        <Label htmlFor={id} className="text-sm font-medium">
          {title}
        </Label>
        <p className="text-sm leading-5 text-muted-foreground">{description}</p>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full rounded-xl sm:w-[220px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SettingNumber({
  title,
  description,
  value,
  min,
  max,
  onChange,
}: {
  title: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number | null) => void;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="min-w-0 space-y-1">
        <Label htmlFor={id} className="text-sm font-medium">
          {title}
        </Label>
        <p className="text-sm leading-5 text-muted-foreground">{description}</p>
      </div>

      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) =>
          onChange(event.target.value ? Number(event.target.value) : null)
        }
        className="w-full rounded-xl sm:w-[220px]"
      />
    </div>
  );
}

type SessionModeSelectorProps = {
  mode: SessionMode;
  onModeChange: (mode: SessionMode) => void;
};

function SessionModeSelector({
  mode,
  onModeChange,
}: SessionModeSelectorProps) {
  const modes = [
    {
      value: "PRACTICE" as const,
      label: "Practice",
      description: "Learn at your own pace",
      icon: BookOpen,
    },
    {
      value: "TEST" as const,
      label: "Test",
      description: "Check your knowledge",
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="mb-6 w-full min-w-0">
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-muted/40 p-2">
        {modes.map((item) => {
          const isActive = mode === item.value;
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onModeChange(item.value)}
              aria-pressed={isActive}
              className="relative flex min-w-0 items-center gap-3 rounded-xl px-3 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 hover:bg-accent transition-colors cursor-pointer"
            >
              {isActive && (
                <motion.span
                  layoutId="session-mode-background"
                  className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/15"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 32,
                  }}
                />
              )}

              <motion.span
                animate={{
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.16)"
                    : "var(--background)",
                  color: isActive
                    ? "#ffffff"
                    : "var(--muted-foreground)",
                }}
                transition={{ duration: 0.2 }}
                className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl"
              >
                <Icon size={20} strokeWidth={1.8} />
              </motion.span>

              <span className="relative z-10 flex min-w-0 flex-1 flex-col gap-1">
                <span
                  className={`truncate text-sm font-semibold ${
                    isActive ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>

                <span
                  className={`truncate text-xs hidden md:inline ${
                    isActive
                      ? "text-primary-foreground/75"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.description}
                </span>
              </span>

              <motion.span
                animate={{
                  scale: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="relative z-10 hidden size-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 sm:flex"
              >
                <Check
                  size={12}
                  strokeWidth={2.5}
                  className="text-primary-foreground"
                />
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


export function StartAttemptSettingsForm({
  mode,
  settings,
  onModeChange,
  onSettingsChange,
  onStart,
  isStarting,
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

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-6">
      <SessionModeSelector mode={mode} onModeChange={onModeChange} />
      <motion.form
        key={mode}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="space-y-4"
      >
        <SettingsSection
          title="Question navigation"
          description="Control how you move through the quiz."
          icon={ListOrdered}
        >
          <SettingSelect
            title="Navigation"
            description="Choose whether to move freely or in order."
            value={settings.navigation}
            options={[
              { label: "Free navigation", value: "FREE" },
              { label: "Sequential", value: "SEQUENTIAL" },
            ]}
            onChange={(value) =>
              update("navigation", value as AttemptSettings["navigation"])
            }
          />

          <SettingToggle
            title="Allow skipping"
            description="Move on without answering a question."
            checked={settings.allowSkip}
            onChange={(value) => update("allowSkip", value)}
          />

          <SettingToggle
            title="Allow question retries"
            description="Return to a question and try again."
            checked={settings.allowQuestionRetry}
            onChange={(value) => update("allowQuestionRetry", value)}
          />

          <SettingToggle
            title="Allow answer changes"
            description="Edit your answer before it is locked."
            checked={settings.allowAnswerChange}
            onChange={(value) => update("allowAnswerChange", value)}
          />
        </SettingsSection>

        <SettingsSection
          title="Timers"
          description="Set a time limit for questions or the whole session."
          icon={Clock3}
        >
          <SettingToggle
            title="Question timer"
            description="Enable a countdown for each question."
            checked={settings.questionTimerEnabled}
            onChange={(value) => update("questionTimerEnabled", value)}
          />

          {settings.questionTimerEnabled && (
            <SettingNumber
              title="Question time limit"
              description="Default time per question, in seconds."
              value={settings.defaultQuestionTimeLimit ?? 30}
              min={5}
              max={3600}
              onChange={(value) => update("defaultQuestionTimeLimit", value)}
            />
          )}

          <SettingToggle
            title="Total session timer"
            description="End the session when time runs out."
            checked={settings.totalTimerEnabled}
            onChange={(value) => update("totalTimerEnabled", value)}
          />

          {settings.totalTimerEnabled && (
            <SettingNumber
              title="Session time limit"
              description="Total time for the session, in minutes."
              value={
                settings.totalTimeLimitSeconds
                  ? settings.totalTimeLimitSeconds / 60
                  : 30
              }
              min={1}
              max={1440}
              onChange={(value) =>
                update(
                  "totalTimeLimitSeconds",
                  value === null ? null : value * 60,
                )
              }
            />
          )}
        </SettingsSection>

        <SettingsSection
          title="Results and feedback"
          description="Choose when answers and scores are revealed."
          icon={Eye}
        >
          <SettingSelect
            title="Correct answers"
            description="When should correct answers appear?"
            value={settings.resultVisibility}
            options={[
              { label: "Immediately", value: "IMMEDIATE" },
              { label: "After submission", value: "AFTER_SUBMISSION" },
              { label: "Hidden", value: "HIDDEN" },
            ]}
            onChange={(value) =>
              update(
                "resultVisibility",
                value as AttemptSettings["resultVisibility"],
              )
            }
          />

          <SettingSelect
            title="Score visibility"
            description="When should the participant see their score?"
            value={settings.scoreVisibility}
            options={[
              { label: "Always", value: "ALWAYS" },
              { label: "After each question", value: "AFTER_QUESTION" },
              { label: "After submission", value: "AFTER_SUBMISSION" },
              { label: "Hidden", value: "HIDDEN" },
            ]}
            onChange={(value) =>
              update(
                "scoreVisibility",
                value as AttemptSettings["scoreVisibility"],
              )
            }
          />

          <SettingToggle
            title="Show explanations"
            description="Display explanations when available."
            checked={settings.showExplanations}
            onChange={(value) => update("showExplanations", value)}
          />
        </SettingsSection>

        <SettingsSection
          title="Question order"
          description="Customize the order of questions and answers."
          icon={Shuffle}
        >
          <SettingToggle
            title="Shuffle questions"
            description="Present questions in a random order."
            checked={settings.shuffleQuestions}
            onChange={(value) => update("shuffleQuestions", value)}
          />

          <SettingToggle
            title="Shuffle answers"
            description="Randomize the order of answer choices."
            checked={settings.shuffleAnswers}
            onChange={(value) => update("shuffleAnswers", value)}
          />
        </SettingsSection>

        <div className="sticky bottom-0 z-10 -mx-4 border-t border-border/70 bg-background/90 p-4 backdrop-blur-xl sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:pt-2 sm:backdrop-blur-none">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full rounded-xl text-base font-semibold shadow-md shadow-primary/15"
          >
            {isStarting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <>
                Start {mode === "PRACTICE" ? "practice" : "test"}
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Your settings are ready. You can go back to change your mode.
          </p>
        </div>
      </motion.form>
    </div>
  );
}
