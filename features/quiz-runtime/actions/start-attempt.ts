"use server";

import { revalidatePath } from "next/cache";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";
import { quizRuntimeService } from "../services/quiz-runtime.service";



type StartAttemptInput = {
  quizId: string;
  settings: unknown;
};

export const startAttempt = async ({
  quizId,
  settings,
}: StartAttemptInput) =>
  tryCatchAsync(async () => {
    const { user } = await requireAuth();

    const result = await quizRuntimeService.createAttempt({
      quizId,
      userId: user.id,
      settings,
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