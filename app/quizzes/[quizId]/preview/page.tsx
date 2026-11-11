import { notFound } from "next/navigation";

import Gameplay from "@/features/quiz-runtime/components/game-play";
import { getPreviewAttempt } from "@/features/quiz-runtime/actions/get-preview-attempt";
import { AttemptSettings } from "@/features/quiz-runtime/types/runtime-types";
import { defaultSettings } from "@/features/quiz-runtime/store";
import { parseBoolean } from "@/lib/utils";
import { SessionMode } from "@/lib/db/generated/prisma/enums";

type PageProps = {
  params: Promise<{ quizId: string }>;
  searchParams: Promise<{
    mode?: string;
    timeLimitEnabled?: string;
    showExplanations?: string;
    shuffleQuestions?: string;
    shuffleAnswers?: string;
    keyboardShortcutsEnabled?: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { quizId } = await params;
  const query = await searchParams;

  if (!quizId) {
    notFound();
  }

  const settings: AttemptSettings = {
    timeLimitEnabled: parseBoolean(
      query.timeLimitEnabled,
      defaultSettings.timeLimitEnabled,
    ),
    showExplanations: parseBoolean(
      query.showExplanations,
      defaultSettings.showExplanations,
    ),
    shuffleQuestions: parseBoolean(
      query.shuffleQuestions,
      defaultSettings.shuffleQuestions,
    ),
    shuffleAnswers: parseBoolean(
      query.shuffleAnswers,
      defaultSettings.shuffleAnswers,
    ),
    keyboardShortcutsEnabled: parseBoolean(
      query.keyboardShortcutsEnabled,
      defaultSettings.keyboardShortcutsEnabled,
    ),
  };

  const mode: SessionMode = query.mode === "CLASSIC" ? "CLASSIC" : "TEST";

  const result = await getPreviewAttempt({
    quizId,
    settings,
    mode,
  });

  if (result.error) {
    notFound();
  }

  return (
    <Gameplay attempt={result.data.runtimeAttempt} />
  );
}
