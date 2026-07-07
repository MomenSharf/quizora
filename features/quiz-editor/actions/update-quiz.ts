"use server";

import { cache } from "react";

import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma";

import { normalizeQuiz } from "@/features/quiz-editor/transformers/quiz-normalizer";

export const getQuiz = cache(async (quizId: string) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },

    include: {
      questions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!quiz) {
    notFound();
  }

  return normalizeQuiz(quiz);
});
