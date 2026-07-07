import prisma from "@/lib/db/prisma";

export const questionRepository = {
  create(
    quizId: string,
    question: Parameters<typeof prisma.question.create>[0]["data"],
  ) {
    return prisma.question.create({
      data: {
        ...question,
        quizId,
      },
    });
  },

  update(
    id: string,
    data: Parameters<typeof prisma.question.update>[0]["data"],
  ) {
    return prisma.question.update({
      where: {
        id,
      },
      data,
    });
  },

  delete(id: string) {
    return prisma.question.delete({
      where: {
        id,
      },
    });
  },

  move(
    id: string,
    order: number,
  ) {
    return prisma.question.update({
      where: {
        id,
      },
      data: {
        order,
      },
    });
  },

  duplicate(id: string) {
    return prisma.$transaction(async (tx) => {
      const question = await tx.question.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return tx.question.create({
        data: {
          quizId: question.quizId,

          type: question.type,

          title: question.title,

          description: question.description,

          explanation: question.explanation,

          hint: question.hint,

          points: question.points,

          order: question.order + 1,

          imageUrl: question.imageUrl,

          tags: question.tags,

          difficulty: question.difficulty,

          content: question.content,

          config: question.config,
        },
      });
    });
  },

  reorder(
    quizId: string,
    questionIds: string[],
  ) {
    return prisma.$transaction(
      questionIds.map((id, index) =>
        prisma.question.update({
          where: {
            id,
            quizId,
          },
          data: {
            order: index,
          },
        }),
      ),
    );
  },
};