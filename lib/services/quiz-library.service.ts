import { Prisma } from "../db/generated/prisma/client";
import prisma from "../db/prisma";

export type QuizLibraryItem = Prisma.QuizGetPayload<{
  include: {
    thumbnail: true;
    owner: {
      select: {
        email: true;
        image: true;
        name: true;
      };
    };
    _count: {
      select: {
        questions: true;
      };
    };
  };
}>;

export type QuizAttemptLibraryItem = Prisma.QuizAttemptGetPayload<{
  include: {
    quiz: {
      include: {
        thumbnail: true;
      };
    };
    questions: {
      select: {
        status: true;
      };
    };
  };
}>;

export const collectionService = {
  async getMyQuizzes(ownerId: string) {
    return prisma.quiz.findMany({
      where: {
        ownerId,
      },
      include: {
        thumbnail: true,
        owner: {
          select: {
            email: true,
            image: true,
            name: true,
          },
        },
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  },

  async getMyAttempts(userId: string) {
    return prisma.quizAttempt.findMany({
      where: {
        userId,
      },
      include: {
        quiz: {
          include: {
            thumbnail: true,
          },
        },
        questions: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  },

  async getMyAttempt(userId: string, attemptId: string) {
    return prisma.quizAttempt.findFirst({
      where: {
        id: attemptId,
        userId,
      },
      include: {
        quiz: {
          include: {
            thumbnail: true,
          },
        },
        questions: {
          select: {
            status: true,
          },
        },
      },
    });
  },
};