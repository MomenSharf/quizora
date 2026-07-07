"use server";

import { revalidatePath } from "next/cache";

import { QuizSchema, type Quiz } from "@/features/quiz-editor/validation/quiz";

import prisma from "@/lib/db/prisma";
import { auth } from "@/lib/auth/auth-options";

type SaveQuizInput = {
  quizId: string;

  values: Quiz;
};

export async function saveQuiz({ quizId, values }: SaveQuizInput) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const quiz = QuizSchema.parse(values);

  await prisma.quiz.update({
    where: {
      id: quizId,
    },

    data: {
      title: quiz.info.title,
      description: quiz.info.description,
      tags: quiz.info.tags,

      settings: quiz.settings,

      appearance: quiz.appearance,

      version: {
        increment: 1,
      },
    },
  });

  revalidatePath(`/quiz/${quizId}`);

  return {
    success: true,
    savedAt: new Date(),
  };
}
