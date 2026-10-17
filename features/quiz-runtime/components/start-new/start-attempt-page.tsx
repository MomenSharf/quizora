"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

import type { AttemptSettings, SessionMode } from "../../types/runtime-types";
import { MODE_DEFAULTS } from "../../config/mode-defaults";
import { ModeSelection } from "./mode-selection";
import { StartAttemptSettingsForm } from "./start-attempt-settings-form";
import { Logo } from "@/components/logo";
import { startAttempt } from "../../actions/start-attempt";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type StartNewPageProps = {
  quizId: string;
  quizTitle: string;
  questionCount: number;
};



const createSettings = (mode: SessionMode): AttemptSettings => ({
  ...MODE_DEFAULTS[mode],
});

export default function StartAttemptPage({
  quizId,
  quizTitle,
  questionCount,
}: StartNewPageProps) {
  const [selectedMode, setSelectedMode] = useState<SessionMode | null>(null);

  const [settingsByMode, setSettingsByMode] = useState<
    Record<SessionMode, AttemptSettings>
  >(() => ({
    PRACTICE: createSettings("PRACTICE"),
    TEST: createSettings("TEST"),
  }));

  const [isStarting, setIsStarting] = useState(false);

  const settings = selectedMode ? settingsByMode[selectedMode] : null;

  const router = useRouter();

  const handleSettingsChange = (next: AttemptSettings) => {
    setSettingsByMode((previous) => ({
      ...previous,
      [next.mode]: next,
    }));
  };

  const handleStart = async () => {
    if (!selectedMode || isStarting) return;

    setIsStarting(true);

    try {
      const payload = {
        quizId,
        mode: selectedMode,
        settings: settingsByMode[selectedMode],
      };

      const res = await startAttempt(payload);

      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Attempt started.");
      // router.push(`/play/${res.data.attemptId}`);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Logo
            containerClassName="size-9 rounded-xl"
            iconClassName="size-[18px]"
            textClassName="text-lg"
            handleClick={
              !selectedMode
                ? { mode: "Link", href: "/" }
                : { mode: "Button", onClick: () => setSelectedMode(null) }
            }
            withChevron={!!selectedMode}
          />

          <div className="mx-1 h-8 w-px shrink-0 bg-border sm:mx-2" />

          <div className="min-w-0 flex-1">
            <p
              title={quizTitle}
              className="truncate text-sm font-semibold sm:text-[15px]"
            >
              {quizTitle}
            </p>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{questionCount} questions</span>
              <span className="text-border">·</span>
              <span>
                {selectedMode
                  ? selectedMode === "PRACTICE"
                    ? "Practice"
                    : "Test"
                  : "Choose a mode"}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedMode && (
              <motion.button
                key="start-button"
                type="button"
                onClick={handleStart}
                disabled={isStarting || questionCount === 0}
                initial={{ opacity: 0, scale: 0.92, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: 8 }}
                transition={{ duration: 0.18 }}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 sm:px-5"
              >
                {isStarting ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <>
                    <span className="hidden sm:inline">Start</span>
                    <span className="sm:hidden">Start</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100dvh-68px)] max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedMode ? (
            <motion.div
              key="mode-selection"
              className="flex flex-1 flex-col"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <ModeSelection
                quizTitle={quizTitle}
                questionCount={questionCount}
                onSelectMode={setSelectedMode}
              />
            </motion.div>
          ) : (
            <motion.div
              key="settings"
              className="flex-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <StartAttemptSettingsForm
                quizTitle={quizTitle}
                questionCount={questionCount}
                mode={selectedMode}
                settings={settings!}
                onModeChange={setSelectedMode}
                onSettingsChange={handleSettingsChange}
                onStart={handleStart}
                isStarting={isStarting}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
