import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";

import { ImageData } from "@/features/quiz-editor/validation/image";
import { Prisma } from "@/lib/db/generated/prisma/client";
import { createId } from "@paralleldrive/cuid2";
import {
  AttemptSettings,
  QuizAttemptRuntime,
  SessionMode,
} from "../types/runtime-types";
import { mapPreviewAttemptQuestions } from "../transformers/runtime-attempt-mapper";

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

type PreviewAttemptInput = {
  quizId: string;
  userId: string;
  settings: AttemptSettings;
  mode: SessionMode;
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

      await tx.quiz.update({
        where: {
          id: quizId,
        },
        data: {
          playCount: {
            increment: 1,
          },
        },
      });

      return {
        attemptId: attempt.id,
        status: attempt.status,
        created: true,
      };
    });
  },

  async incrementPlayCount(quizId: string) {
    return prisma.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        playCount: {
          increment: 1,
        },
      },
      select: {
        playCount: true,
      },
    });
  },

  async incrementCompletionCount(quizId: string) {
    return prisma.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        completionCount: {
          increment: 1,
        },
      },
      select: {
        completionCount: true,
      },
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

    return attempt;
  },

  async getPreviewAttempt({
    quizId,
    userId,
    settings,
    mode,
  }: PreviewAttemptInput) {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: quizId,
        ownerId: userId,
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

    const previewAttempt: QuizAttemptRuntime = {
      id: createId(),
      quizId: quiz.id,

      mode,
      environment: "PREVIEW",
      status: "IDLE",
      phase: "READY",
      currentView: "READY",

      quizSnapshot: {
        title: quiz.title,
        description: quiz.description,
        thumbnail: quiz.thumbnail as ImageData,
        tags: quiz.tags,
        language: quiz.language,
        category: quiz.category,
      },

      currentQuestionIndex: 0,

      settings,

      startedAt: null,
      lastActivityAt: null,
      completedAt: null,
      expiresAt: null,

      questions: quiz.questions.map((q, i) => mapPreviewAttemptQuestions(q, i)),
    };

    return previewAttempt;
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
          quizId: true,
          startedAt: true,
          completedAt: true,
        },
      });

      if (!existingAttempt) {
        throw AppErrors.notFound("Quiz attempt not found");
      }

      const startedNow = !existingAttempt.startedAt && !!attempt.startedAt;

      const completedNow =
        !existingAttempt.completedAt && !!attempt.completedAt;

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

          ...(startedNow && {
            playCount: {
              increment: 1,
            },
          }),
          ...(completedNow && {
            completionCount: {
              increment: 1,
            },
          }),

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
