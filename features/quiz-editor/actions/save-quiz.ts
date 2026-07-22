"use server";

import {
  type QuizEditor
} from "@/features/quiz-editor/validation/quiz";
import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";
import { EditorState } from "../store";
import { serializeUpdateQuiz } from "../transformers/quiz-serializer";

export async function saveQuiz(
  quiz: QuizEditor,
  editorState: EditorState,
) {
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
      data: serializeUpdateQuiz(quiz, editorState),
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