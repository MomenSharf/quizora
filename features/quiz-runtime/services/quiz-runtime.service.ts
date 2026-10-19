import { Prisma } from "@/lib/db/generated/prisma/client";
import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";

import type { SessionMode } from "../types/runtime-types";
import { MODE_DEFAULTS } from "../config/mode-defaults";

type StartAttemptInput = {
  quizId: string;
  userId: string;
  mode: SessionMode;
  settings: unknown;
};

type GetAttemptInput = {
  attemptId: string;
  userId: string;
};

const ACTIVE_STATUSES = ["IN_PROGRESS", "PAUSED"] as const;

export const quizRuntimeService = {
  async createAttempt({
    quizId,
    userId,
    mode,
    settings,
  }: StartAttemptInput) {
    return prisma.$transaction(async (tx) => {
      const quiz = await tx.quiz.findFirst({
        where: {
          id: quizId,
          deletedAt: null,
        },
        include: {
          questions: {
            where: {
              deletedAt: null,
            },
            orderBy: {
              order: "asc",
            },
            include: {
              image: true,
            },
          },
        },
      });

      if (!quiz) {
        throw AppErrors.notFound("Quiz not found");
      }

      if (quiz.questions.length === 0) {
        throw AppErrors.badRequest("This quiz has no questions");
      }

      const existingAttempt = await tx.quizAttempt.findFirst({
        where: {
          userId,
          quizId,
          mode,
          status: {
            in: [...ACTIVE_STATUSES],
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
        },
      });

      if (existingAttempt) {
        return {
          attemptId: existingAttempt.id,
          status: existingAttempt.status,
          created: false,
        };
      }

      const totalPoints = quiz.questions.reduce(
        (total, question) => total + question.points,
        0,
      );

      const defaultSettings = MODE_DEFAULTS[mode];

      const attemptSettings = {
        ...defaultSettings,
        ...(settings as Partial<typeof defaultSettings>),
        mode,
      };

      const attempt = await tx.quizAttempt.create({
        data: {
          userId,
          quizId,
          mode,
          status: "IN_PROGRESS",
          quizTitle: quiz.title,

          quizSnapshot: {
            title: quiz.title,
            description: quiz.description,
            questions: quiz.questions.map((question) => ({
              id: question.id,
              type: question.type,
              title: question.title,
              description: question.description,
              points: question.points,
              content: question.content,
              config: question.config,
            })),
          },

          settings: attemptSettings as Prisma.InputJsonValue,

          currentQuestionIndex: 0,
          totalQuestions: quiz.questions.length,
          answeredQuestions: 0,
          correctAnswers: 0,
          score: 0,
          totalPoints,

          timeLimitSeconds: attemptSettings.totalTimerEnabled
            ? attemptSettings.totalTimeLimitSeconds
            : null,

          questions: {
            create: quiz.questions.map((question, index) => ({
              questionId: question.id,
              orderIndex: index,

              questionSnapshot: {
                id: question.id,
                type: question.type,
                title: question.title,
                description: question.description,
                hint: question.hint,
                points: question.points,
                content: question.content,
                config: question.config,
                image: question.image,
              },

              answerKeySnapshot: question.config as Prisma.InputJsonValue,
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
          }
        }
      },
    });

    if (!attempt) {
      throw AppErrors.notFound("Quiz attempt not found");
    }

    return attempt;
  },

};