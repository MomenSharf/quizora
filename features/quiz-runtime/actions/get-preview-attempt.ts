"use server";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";

import { quizRuntimeService } from "../services/quiz-runtime.service";
import { AttemptSettings } from "../types/runtime-types";
import { SessionMode } from "@/lib/db/generated/prisma/enums";

type GetPreviewAttemptInput = {
  quizId: string;
  settings: AttemptSettings;
  mode: SessionMode;
};

export const getPreviewAttempt = async ({
  quizId,
  settings,
  mode,
}: GetPreviewAttemptInput) =>
  tryCatchAsync(async () => {
    const { user } = await requireAuth();

    const previewAttempt = await quizRuntimeService.getPreviewAttempt({
      quizId,
      userId: user.id,
      settings,
      mode,
    });

    return {
      runtimeAttempt: previewAttempt,
    };
  });
