"use server";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";

import { quizRuntimeService } from "../services/quiz-runtime.service";

type IncrementPlayCountInput = {
  quizId: string;
};

export const incrementPlayCount = async ({ quizId }: IncrementPlayCountInput) =>
  tryCatchAsync(async () => {
    await requireAuth();

    await quizRuntimeService.incrementPlayCount(quizId);

    return { success: true };
  });
