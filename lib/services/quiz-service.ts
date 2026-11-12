import { Prisma } from "../db/generated/prisma/client";
import prisma from "../db/prisma";

const quizLibrarySelect = {
  id: true,
  title: true,
  description: true,
  visibility: true,
  updatedAt: true,
  language: true,
  category: true,
  tags: true,
  publishedAt: true,
  createdAt: true,
  thumbnail: {
    select: {
      id: true,
      url: true,
    },
  },
  owner: {
    select: {
      name: true,
      image: true,
    },
  },
  _count: {
    select: {
      questions: true,
    },
  },
} satisfies Prisma.QuizSelect;

const quizAttemptLibrarySelect = {
  id: true,
  quizId: true,
  status: true,
  updatedAt: true,
  createdAt: true,

  quiz: {
    select: {
      id: true,
      title: true,
      language: true,
      category: true,
      tags: true,
      description: true,
      thumbnail: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  },
  questions: {
    select: {
      id: true,
      status: true,
    },
  },
} satisfies Prisma.QuizAttemptSelect;

export type QuizLibraryItem = Prisma.QuizGetPayload<{
  select: typeof quizLibrarySelect;
}>;

export type QuizAttemptLibraryItem = Prisma.QuizAttemptGetPayload<{
  select: typeof quizAttemptLibrarySelect;
}>;

export const collectionService = {
  async getMyQuizzes(ownerId: string) {
    return prisma.quiz.findMany({
      where: { ownerId },
      select: quizLibrarySelect,
      orderBy: { updatedAt: "desc" },
    });
  },

  async getMyAttempts(userId: string) {
    return prisma.quizAttempt.findMany({
      where: { userId },
      select: quizAttemptLibrarySelect,
      orderBy: { updatedAt: "desc" },
    });
  },

  async getMyAttempt(userId: string, attemptId: string) {
    return prisma.quizAttempt.findFirst({
      where: {
        id: attemptId,
        userId,
      },
      select: quizAttemptLibrarySelect,
    });
  },
};
