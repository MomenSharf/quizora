import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";
import { Prisma } from "@/lib/db/generated/prisma/client";

function serializeAppearance(
  appearance: QuizEditor["appearance"],
): Prisma.InputJsonValue {
  return appearance satisfies Prisma.InputJsonValue;
}

function serializeSettings(
  quiz: QuizEditor,
): Prisma.InputJsonValue {
  return {
    ...quiz.settings,
    language: quiz.info.language,
    category: quiz.info.category,
  } satisfies Prisma.InputJsonValue;
}

function serializeQuestion(
  question: QuizEditor["questions"][number],
  order: number,
): Prisma.QuestionCreateWithoutQuizInput {
  return {
    id: question.id,

    type: question.type,

    title: question.title,

    description: question.description,

    explanation: question.explanation,

    hint: question.hint,

    points: question.points,

    order,

    imageUrl: question.imageUrl,

    tags: question.tags,

    difficulty: question.difficulty,

    content: question.content,

    config: question.config,
  };
}

export function serializeQuiz(
  quiz: QuizEditor,
): Prisma.QuizUpdateInput {
  const questionCount = quiz.questions.length;

  const totalPoints = quiz.questions.reduce(
    (sum, question) => sum + question.points,
    0,
  );

  return {
    title: quiz.info.title,

    description: quiz.info.description,

    slug: quiz.slug,

    status: quiz.status,

    version: {
      increment: 1,
    },

    visibility: quiz.settings.visibility,

    tags: quiz.info.tags,

    appearance: serializeAppearance(
      quiz.appearance,
    ),

    settings: serializeSettings(
      quiz,
    ),

    questionCount,

    totalPoints,

    questions: {
      deleteMany: {},

      create: quiz.questions.map(
        serializeQuestion,
      ),
    },
  };
}