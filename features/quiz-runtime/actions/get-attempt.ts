"use server";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";

import { quizRuntimeService } from "../services/quiz-runtime.service";
import { mapQuizAttempt } from "../transformers/runtime-attempt-mapper";

type GetAttemptInput = {
  attemptId: string;
};

export const getAttempt = async ({ attemptId }: GetAttemptInput) =>
  tryCatchAsync(async () => {
    const { user } = await requireAuth();

    const attempt = await quizRuntimeService.getAttempt({
      attemptId,
      userId: user.id,
    });

    console.log(attempt.quiz.questions[0].title);

    const runttimeAttempt = mapQuizAttempt(attempt);

    return runttimeAttempt;
  });
