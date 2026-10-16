"use server";

import { revalidatePath } from "next/cache";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";
import prisma from "@/lib/db/prisma";

export const createDevelopmentQuiz = async () =>
  tryCatchAsync(async () => {
    const { user } = await requireAuth();

    const quiz = await prisma.quiz.create({
      data: {
        title: "Development Quiz",
        description: "Sample quiz for testing gameplay.",
        owner: {
          connect: { id: user.id },
        },
        editorState: {},
        questionCount: 10,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/dashboard");

    return {
      quizId: quiz.id,
      message: "Development quiz created successfully.",
    };
  });