"use server";

import { AppErrors } from "@/lib/errors/app-errors";
import {
  QuizEditorSchema,
  type QuizEditor,
} from "@/features/quiz-editor/validation/quiz";
import prisma from "@/lib/db/prisma";
import { serializeUpdateQuiz } from "../transformers/quiz-serializer";

export async function saveQuiz(input: QuizEditor) {
  const parsed = QuizEditorSchema.safeParse(input);

  if (!parsed.success) {
    throw AppErrors.validation("Invalid quiz data", {
      issues: parsed.error.flatten(),
    });
  }

  const quiz = parsed.data;

  const exists = await prisma.quiz.findUnique({
    where: {
      id: quiz.id,
    },
    select: {
      id: true,
    },
  });

  if (!exists) {
    throw AppErrors.notFound("Quiz not found");
  }

  try {
    await prisma.quiz.update({
      where: {
        id: quiz.id,
      },
      data: serializeUpdateQuiz(quiz),
    });

    return {
      success: true,
      savedAt: new Date(),
    };
  } catch (error) {
    console.error(error);

    throw AppErrors.internal("Failed to save quiz");
  }
}