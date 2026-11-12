"use server";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";

import { quizRuntimeService } from "../services/quiz-runtime.service";

type IncrementCompletionCountInput = {
  quizId: string;
};

export const incrementCompletionCount = async ({
  quizId,
}: IncrementCompletionCountInput) =>
  tryCatchAsync(async () => {
    await requireAuth();

    await quizRuntimeService.incrementCompletionCount(quizId);

    return { success: true };
  });