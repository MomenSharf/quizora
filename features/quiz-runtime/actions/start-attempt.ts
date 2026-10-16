"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";
import { SessionMode } from "../types/runtime-types";
import { quizRuntimeService } from "../services/quiz-runtime.service";



type StartAttemptInput = {
  quizId: string;
  mode: SessionMode;
  settings: unknown;
};

export const startAttempt = async ({
  quizId,
  mode,
  settings,
}: StartAttemptInput) =>
  tryCatchAsync(async () => {
    const { user } = await requireAuth();

    const result = await quizRuntimeService.startAttempt({
      quizId,
      userId: user.id,
      mode,
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