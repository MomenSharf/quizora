"use server";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";
import { quizEditorService } from "../services/quiz-editor.service";

export const getQuiz = async (id: string) =>
  tryCatchAsync(async () => {
    const {user} = await requireAuth();

    const result = await quizEditorService.getQuiz(id, user.id);

    return {
     ...result,
      message: "Quiz loaded successfully.",
    };
  });
