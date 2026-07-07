"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db/prisma";

import {
  QuizEditorSchema,
  type QuizEditor,
} from "@/features/quiz-editor/validation/quiz";
import { serializeQuiz } from "@/features/quiz-editor/transformers/quiz-serializer";

export async function updateQuiz(input: QuizEditor) {
  const quiz = QuizEditorSchema.parse(input);

  const data = serializeQuiz(quiz);

  await prisma.quiz.update({
    where: {
      id: quiz.id,
    },
    data,
  });

  revalidatePath(`/quiz/${quiz.id}`);
  revalidatePath(`/quiz/${quiz.id}/edit`);

  return {
    success: true,
    updatedAt: new Date(),
  };
}
