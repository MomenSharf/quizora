"use server";

import { notFound } from "next/navigation";

import { QuizSchema, type Quiz } from "@/features/quiz-editor/validation/quiz";
import type { Question } from "@/features/quiz-editor/validation/question";

import type { QuizEditor } from "../store";
import prisma from "@/lib/db/prisma";

export async function loadQuiz(quizId: string): Promise<QuizEditor> {
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

  const questions: Record<string, Question> = {};

  for (const question of quiz.questions) {
    questions[question.id] = {
      id: question.id,

      type: question.type,

      title: question.title,

      description: question.description ?? "",

      explanation: question.explanation ?? "",

      hint: question.hint ?? "",

      points: question.points,

      imageUrl: question.imageUrl ?? undefined,

      tags: question.tags,

      difficulty: question.difficulty,

      data: question.data,

      settings: question.settings,
    } as Question;
  }

  return {
    id: quiz.id,

    slug: quiz.slug,

    status: quiz.status,

    version: quiz.version,

    info: QuizSchema.shape.info.parse({
      title: quiz.title,
      description: quiz.description ?? "",
      tags: quiz.tags,
      language: "en",
    }),

    settings: QuizSchema.shape.settings.parse(quiz.settings ?? {}),

    appearance: QuizSchema.shape.appearance.parse(quiz.appearance ?? {}),

    questions,

    questionOrder: quiz.questions.map((question) => question.id),
  };
}
