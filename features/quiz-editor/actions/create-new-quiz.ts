"use server";

import { revalidatePath } from "next/cache";

import { tryCatchAsync } from "@/lib/utils/try-catch";
import { requireAuth } from "@/features/auth/lib/require-auth";

import { quizEditorService } from "../services/quiz-editor.service";

export const createNewQuiz = async () =>
  tryCatchAsync(async () => {
    const { user } = await requireAuth();

    const result = await quizEditorService.createQuiz(user.id);

    revalidatePath("/dashboard");

    return {
      ...result,
      message: "Quiz created successfully.",
    };
  });