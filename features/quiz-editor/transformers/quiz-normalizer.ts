
import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";
import { Prisma } from "@/lib/db/generated/prisma/client";

export function normalizeQuiz(
  quiz: Prisma.QuizGetPayload<{
    include: {
      questions: true;
    };
  }>,
): QuizEditor {
  return {
    id: quiz.id,

    slug: quiz.slug ?? undefined,

    status: quiz.status,

    version: quiz.version,

    info: {
      title: quiz.title,
      description: quiz.description ?? "",
      thumbnail:
        (quiz.appearance as any)?.thumbnail ?? undefined,
      tags: quiz.tags,
      language:
        (quiz.settings as any)?.language ?? "en",
      category:
        (quiz.settings as any)?.category ?? undefined,
    },

    appearance: {
      theme:
        (quiz.appearance as any)?.theme ?? "SYSTEM",

      primaryColor:
        (quiz.appearance as any)?.primaryColor ??
        "#6366F1",

      backgroundColor:
        (quiz.appearance as any)?.backgroundColor ??
        "#FFFFFF",

      textColor:
        (quiz.appearance as any)?.textColor ??
        "#111827",

      logo:
        (quiz.appearance as any)?.logo,

      coverImage:
        (quiz.appearance as any)?.coverImage,

      font:
        (quiz.appearance as any)?.font ??
        "Inter",

      borderRadius:
        (quiz.appearance as any)?.borderRadius ??
        12,

      showProgressBar:
        (quiz.appearance as any)?.showProgressBar ??
        true,

      showQuestionNumber:
        (quiz.appearance as any)?.showQuestionNumber ??
        true,
    },

    settings: {
      visibility:
        quiz.visibility,

      shuffleQuestions:
        (quiz.settings as any)?.shuffleQuestions ??
        false,

      shuffleOptions:
        (quiz.settings as any)?.shuffleOptions ??
        false,

      showCorrectAnswers:
        (quiz.settings as any)?.showCorrectAnswers ??
        true,

      showScore:
        (quiz.settings as any)?.showScore ??
        true,

      showExplanations:
        (quiz.settings as any)?.showExplanations ??
        true,

      allowRetry:
        (quiz.settings as any)?.allowRetry ??
        true,

      saveProgress:
        (quiz.settings as any)?.saveProgress ??
        true,

      requireAllQuestions:
        (quiz.settings as any)?.requireAllQuestions ??
        false,

      passingScore:
        (quiz.settings as any)?.passingScore ??
        60,

      attempts:
        (quiz.settings as any)?.attempts ??
        0,

      timeLimit:
        (quiz.settings as any)?.timeLimit ??
        0,
    },

    questions: quiz.questions
      .sort((a, b) => a.order - b.order)
      .map((question) => ({
        id: question.id,

        type: question.type,

        title: question.title,

        description:
          question.description ?? "",

        explanation:
          question.explanation ?? "",

        hint:
          question.hint ?? "",

        required: true,

        points:
          question.points,

        imageUrl:
          question.imageUrl ?? undefined,

        tags:
          question.tags,

        difficulty:
          question.difficulty,

        media: {},

        data:
          question.content as never,

        settings:
          question.config as never,
      })),
  };
}