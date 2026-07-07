import prisma from "@/lib/db/prisma";
import { cache } from "react";


export const quizRepository = {
  getById: cache(async (id: string) => {
    return prisma.quiz.findUnique({
      where: {
        id,
      },

      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }),

  create(data: Parameters<typeof prisma.quiz.create>[0]["data"]) {
    return prisma.quiz.create({
      data,
    });
  },

  update(
    id: string,
    data: Parameters<typeof prisma.quiz.update>[0]["data"],
  ) {
    return prisma.quiz.update({
      where: {
        id,
      },
      data,
    });
  },

  delete(id: string) {
    return prisma.quiz.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });
  },

  publish(id: string) {
    return prisma.quiz.update({
      where: {
        id,
      },

      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
        publishedVersion: {
          increment: 1,
        },
      },
    });
  },

  archive(id: string) {
    return prisma.quiz.update({
      where: {
        id,
      },

      data: {
        status: "ARCHIVED",
      },
    });
  },

  duplicate(id: string) {
    return prisma.$transaction(async (tx) => {
      const quiz = await tx.quiz.findUniqueOrThrow({
        where: {
          id,
        },

        include: {
          questions: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });

      const created = await tx.quiz.create({
        data: {
          title: `${quiz.title} Copy`,
          description: quiz.description,
          slug: null,

          ownerId: quiz.ownerId,

          status: "DRAFT",
          visibility: quiz.visibility,

          settings: quiz.settings,
          appearance: quiz.appearance,

          tags: quiz.tags,

          questionCount: quiz.questionCount,
          totalPoints: quiz.totalPoints,

          questions: {
            create: quiz.questions.map((question) => ({
              type: question.type,

              title: question.title,
              description: question.description,
              explanation: question.explanation,
              hint: question.hint,

              points: question.points,

              order: question.order,

              imageUrl: question.imageUrl,

              tags: question.tags,

              difficulty: question.difficulty,

              content: question.content,

              config: question.config,
            })),
          },
        },

        include: {
          questions: true,
        },
      });

      return created;
    });
  },
};