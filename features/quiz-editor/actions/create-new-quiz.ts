"use server";

import { revalidatePath } from "next/cache";

import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";
import { auth } from "@/features/auth/lib/auth-options";
import { AppErrors } from "@/lib/errors/app-errors";
import { serializeNewQuiz } from "../transformers/quiz-serializer";
import prisma from "@/lib/db/prisma";

export async function createNewQuiz(quiz: QuizEditor) {
  const session = await auth();

  if (!session?.user?.id) {
    throw AppErrors.unauthorized("You must be logged in to create a quiz");
  }

  try {
    const createdQuiz = await prisma.quiz.create({
      data: serializeNewQuiz(quiz, session.user.id),
      select: {
        id: true,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      quizId: createdQuiz.id,
    };
  } catch (error) {
    console.error(error);

    throw AppErrors.internal("Failed to create quiz");
  }
}
