"use server";

import { revalidatePath } from "next/cache";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";
import { quizRuntimeService } from "../services/quiz-runtime.service";
import { AttemptSettings, SessionMode } from "../types/runtime-types";



type StartAttemptInput = {
  quizId: string;
  settings: AttemptSettings;
  mode : SessionMode
};

export const startAttempt = async ({
  quizId,
  settings,
  mode
}: StartAttemptInput) =>
  tryCatchAsync(async () => {
    const { user } = await requireAuth();

    const {keyboardShortcutsEnabled, ...resSettings} = settings

    const result = await quizRuntimeService.createAttempt({
      quizId,
      userId: user.id,
      settings,
      mode
    });

    revalidatePath(`/quizzes/${quizId}`);
    revalidatePath("/dashboard");

    return {
      ...result,
      message: result.created
        ? "Quiz attempt started successfully."
        : "Your existing quiz attempt has been resumed.",
    };
  });