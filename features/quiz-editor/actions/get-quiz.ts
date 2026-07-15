// features/quiz-editor/actions/get-quiz.ts
"use server";

import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";
import { mapQuiz } from "../transformers/quiz.mapper";

export async function getQuiz(id: string) {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
    },
  });
  

  if (!quiz) {
    throw AppErrors.notFound("Quiz not found");
  }

  return mapQuiz(quiz);
}