
import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";
import { Prisma } from "@/lib/db/generated/prisma/client";

export function serializeQuiz(
  quiz: QuizEditor,
): Prisma.QuizUpdateInput {
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

    appearance: {
      theme: quiz.appearance.theme,
      primaryColor: quiz.appearance.primaryColor,
      backgroundColor: quiz.appearance.backgroundColor,
      textColor: quiz.appearance.textColor,
      logo: quiz.appearance.logo,
      coverImage: quiz.appearance.coverImage,
      font: quiz.appearance.font,
      borderRadius: quiz.appearance.borderRadius,
      showProgressBar: quiz.appearance.showProgressBar,
      showQuestionNumber:
        quiz.appearance.showQuestionNumber,
    },

    settings: {
      language: quiz.info.language,
      category: quiz.info.category,

      shuffleQuestions:
        quiz.settings.shuffleQuestions,

      shuffleOptions:
        quiz.settings.shuffleOptions,

      showCorrectAnswers:
        quiz.settings.showCorrectAnswers,

      showScore:
        quiz.settings.showScore,

      showExplanations:
        quiz.settings.showExplanations,

      allowRetry:
        quiz.settings.allowRetry,

      saveProgress:
        quiz.settings.saveProgress,

      requireAllQuestions:
        quiz.settings.requireAllQuestions,

      passingScore:
        quiz.settings.passingScore,

      attempts:
        quiz.settings.attempts,

      timeLimit:
        quiz.settings.timeLimit,
    },

    questionCount: quiz.questions.length,

    totalPoints: quiz.questions.reduce(
      (sum, question) => sum + question.points,
      0,
    ),

    questions: {
      deleteMany: {},

      create: quiz.questions.map(
        (question, index) => ({
          id: question.id,

          type: question.type,

          title: question.title,

          description: question.description,

          explanation: question.explanation,

          hint: question.hint,

          points: question.points,

          order: index,

          imageUrl: question.imageUrl,

          tags: question.tags,

          difficulty: question.difficulty,

          content: question.data,

          config: question.settings,
        }),
      ),
    },
  };
} 