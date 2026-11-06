import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";

import { AttemptSettings, SessionMode } from "../types/runtime-types";

type StartAttemptInput = {
  quizId: string;
  userId: string;
  settings: AttemptSettings;
  mode: SessionMode;
};

type GetAttemptInput = {
  attemptId: string;
  userId: string;
};

export const quizRuntimeService = {
  async createAttempt({ quizId, userId, settings, mode }: StartAttemptInput) {
    return prisma.$transaction(async (tx) => {
      const quiz = await tx.quiz.findFirst({
        where: {
          id: quizId,
        },
        include: {
          questions: {
            orderBy: {
              order: "asc",
            },
            include: {
              image: true,
              explanationImage: true,
            },
          },
          thumbnail: true,
        },
      });

      if (!quiz) {
        throw AppErrors.notFound("Quiz not found");
      }

      if (quiz.questions.length === 0) {
        throw AppErrors.badRequest("This quiz has no questions");
      }

      const attempt = await tx.quizAttempt.create({
        data: {
          userId,
          quizId,
          mode,
          ...settings,

          quizSnapshot: {
            title: quiz.title,
            description: quiz.description,
            thumbnail: quiz.thumbnail,
            tags: quiz.tags,
            language: quiz.language,
            category: quiz.category,
          },

          currentQuestionIndex: 0,

          questions: {
            create: quiz.questions.map((question, index) => ({
              questionId: question.id,
              orderIndex: index,

              questionSnapshot: {
                id: question.id,
                type: question.type,
                title: question.title,
                points: question.points,
                content: question.content,
                image: question.image,
                explanation: question.explanation,
                explanationImage: question.explanationImage,
              },
            })),
          },
        },
        select: {
          id: true,
          status: true,
        },
      });

      return {
        attemptId: attempt.id,
        status: attempt.status,
        created: true,
      };
    });
  },

  async getAttempt({ attemptId, userId }: GetAttemptInput) {
    const attempt = await prisma.quizAttempt.findFirst({
      where: {
        id: attemptId,
        userId,
      },
      include: {
        questions: {
          orderBy: {
            orderIndex: "asc",
          },
        },
        quiz: {
          include: {
            thumbnail: true,
            questions: {
              include: {
                image: true,
              },
            },
          },
        },
      },
    });

    return attempt;
  },
};
