import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";

import {
  AttemptSettings,
  QuizAttemptRuntime,
  SessionMode,
} from "../types/runtime-types";
import { mapQuizAttempt } from "../transformers/runtime-attempt-mapper";
import { Prisma } from "@/lib/db/generated/prisma/client";

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

type SaveAttemptInput = {
  attempt: QuizAttemptRuntime;
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { keyboardShortcutsEnabled, ...attemptSettings } = settings;

      const attempt = await tx.quizAttempt.create({
        data: {
          userId,
          quizId,
          mode,
          ...attemptSettings,

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
              timeLimitSeconds: question.timeLimitSeconds,
              maxPoints: question.points,

              questionSnapshot: {
                id: question.id,
                type: question.type,
                title: question.title,
                points: question.points,
                timeLimitSeconds: question.timeLimitSeconds,
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

    if (!attempt) {
      throw AppErrors.notFound("Quiz attempt not found");
    }

    const runttimeAttempt = mapQuizAttempt(attempt);

    return runttimeAttempt;
  },

  async saveAttempt({ attempt, userId }: SaveAttemptInput) {
    return prisma.$transaction(async (tx) => {
      const existingAttempt = await tx.quizAttempt.findFirst({
        where: {
          id: attempt.id,
          userId,
        },
        select: {
          id: true,
        },
      });

      if (!existingAttempt) {
        throw AppErrors.notFound("Quiz attempt not found");
      }

      await tx.quizAttempt.update({
        where: {
          id: existingAttempt.id,
        },
        data: {
          status: attempt.status,
          currentQuestionIndex: attempt.currentQuestionIndex,
          startedAt: attempt.startedAt,
          lastActivityAt: attempt.lastActivityAt,
          completedAt: attempt.completedAt,
          expiresAt: attempt.expiresAt,

          questions: {
            update: attempt.questions.map((question) => ({
              where: {
                id: question.id,
              },
              data: {
                status: question.status,
                answer: question.answer ?? Prisma.DbNull,
                evaluation: question.evaluation ?? Prisma.DbNull,
                earnedPoints: question.earnedPoints,
                flagged: question.flagged,
                locked: question.locked,
                visited: question.visited,
                startedAt: question.startedAt,
                deadlineAt: question.deadlineAt,
                timeSpentSeconds: question.timeSpentSeconds ?? undefined,
                answeredAt: question.answeredAt,
                evaluatedAt: question.evaluatedAt,
                hasSeenFeedback: question.hasSeenFeedback,
              },
            })),
          },
        },
      });

      return {
        success: true,
      };
    });
  },
};
