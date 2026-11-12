import prisma from "@/lib/db/prisma";

export const quizDetailsService = {
  async getQuizDetails(quizId: string, userId?: string) {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        language: true,
        category: true,
        tags: true,
        difficulty: true,
        estimatedDurationSeconds: true,
        visibility: true,

        questionCount: true,
        totalPoints: true,

        playCount: true,
        viewCount: true,
        completionCount: true,
        likeCount: true,

        isFeatured: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,

        thumbnail: {
          select: {
            id: true,
            url: true,
            alt: true,
          },
        },

        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },

        questions: {
          orderBy: {
            order: "asc",
          },
          select: {
            id: true,
            type: true,
            title: true,
            description: true,
            image: true,
            points: true,
            timeLimitSeconds: true,
            orderIndex: true,
          },
        },
      },
    });

    if (!quiz) return null;

    const isOwner = !!userId && quiz.owner.id === userId;

    if (!isOwner && quiz.visibility !== "PUBLIC") {
      return null;
    }

    return {
      ...quiz,
      isOwner,
    };
  },
};
