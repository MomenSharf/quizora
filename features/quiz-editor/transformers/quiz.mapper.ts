import {
  QuizAppearanceSchema,
  QuizEditorSchema,
  QuizSettingsSchema,
  type QuizEditor,
} from "@/features/quiz-editor/validation/quiz";
import { QuestionSchema } from "@/features/quiz-editor/validation/question";
import { Prisma } from "@/lib/db/generated/prisma/client";

type PrismaQuiz = Prisma.QuizGetPayload<{
  include: {
    questions: true;
  };
}>;

function mapAppearance(value: Prisma.JsonValue | null) {
  return QuizAppearanceSchema.parse(value ?? {});
}

function mapSettings(
  value: Prisma.JsonValue | null,
  visibility: PrismaQuiz["visibility"],
) {
  return {
    ...QuizSettingsSchema.parse(value ?? {}),
    visibility,
  };
}

function mapQuestion(question: PrismaQuiz["questions"][number]) {
  return QuestionSchema.parse({
    id: question.id,
    type: question.type,

    title: question.title,
    description: question.description ?? "",

    explanation: question.explanation ?? "",
    hint: question.hint ?? "",

    required: true,

    points: question.points,

    media: {
      image: question.imageUrl ?? undefined,
    },
    

    content: question.content,

    config: question.config ,
  });
}

export function mapQuiz(
  quiz: PrismaQuiz,
): QuizEditor {
  return QuizEditorSchema.parse({
    id: quiz.id,

    slug: quiz.slug ?? undefined,

    status: quiz.status,

    version: quiz.version,

    info: {
      title: quiz.title,
      description: quiz.description ?? "",

      thumbnail: undefined,

      tags: quiz.tags,

      language: "en",

      category: undefined,
    },

    appearance: mapAppearance(
      quiz.appearance,
    ),

    settings: mapSettings(
      quiz.settings,
      quiz.visibility,
    ),

    questions: [...quiz.questions]
      .sort((a, b) => a.order - b.order)
      .map(mapQuestion),
  });
}