"use server";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";

import { quizRuntimeService } from "../services/quiz-runtime.service";
import type { QuizAttemptRuntime } from "../types/runtime-types";

type SaveAttemptInput = {
  attempt: QuizAttemptRuntime;
};

export const saveAttempt = async ({ attempt }: SaveAttemptInput) =>
  tryCatchAsync(async () => {
    const { user } = await requireAuth();

    await quizRuntimeService.saveAttempt({
      attempt,
      userId: user.id,
    });

    return { success: true };
  });