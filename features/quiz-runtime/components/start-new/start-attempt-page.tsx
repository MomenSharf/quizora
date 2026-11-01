"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

import { startAttempt } from "../../actions/start-attempt";
import type { AttemptSettings } from "../../types/runtime-types";
import { StartAttemptSettingsForm } from "./start-attempt-settings-form";

type StartNewPageProps = {
  quizId: string;
  quizTitle: string;
  questionCount: number;
};

const DEFAULT_SETTINGS: AttemptSettings = {
  mode: "STANDARD",
  timeLimitSeconds: 300,
  showExplanations: true,
  shuffleQuestions: false,
  shuffleAnswers: false,
};

export default function StartAttemptPage({
  quizId,
  quizTitle,
  questionCount,
}: StartNewPageProps) {
  const router = useRouter();

  const [settings, setSettings] = useState<AttemptSettings>(DEFAULT_SETTINGS);

  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    if (isStarting || questionCount === 0) return;

    setIsStarting(true);

    try {
      const res = await startAttempt({
        quizId,
        settings,
      });

      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      router.push(`/play/${res.data.attemptId}?environment=PREVIEW`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Logo
            containerClassName="size-9 rounded-xl"
            iconClassName="size-[18px]"
            textClassName="hidden text-lg sm:block"
            handleClick={{ mode: "Link", href: "/" }}
          />

          <div className="mx-2 h-8 w-px shrink-0 bg-border" />

          <div className="min-w-0 flex-1">
            <p
              title={quizTitle}
              className="truncate text-sm font-semibold sm:text-[15px]"
            >
              {quizTitle}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {questionCount} questions
            </p>
          </div>

          <Button
            onClick={handleStart}
            disabled={isStarting || questionCount === 0}
            className="h-10 shrink-0 rounded-xl px-4"
          >
            {isStarting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <>
                <span>Start quiz</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-7xl flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1"
        >
          <StartAttemptSettingsForm
            questionCount={questionCount}
            settings={settings}
            onSettingsChange={setSettings}
            onStart={handleStart}
            isStarting={isStarting}
          />
        </motion.div>
      </main>
    </div>
  );
}
