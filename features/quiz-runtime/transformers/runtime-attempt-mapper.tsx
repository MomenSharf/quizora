import { Prisma } from "@/lib/db/generated/prisma/client";

import type { Answer } from "../types/answer-types";
import type { EvaluationResult } from "../types/evaluation-types";
import type {
  QuizAttemptRuntime,
  QuizSnapshot,
  RuntimeQuestion,
} from "../types/runtime-types";

export type PrismaQuizAttempt = Prisma.QuizAttemptGetPayload<{
  include: {
    questions: true;
    quiz: {
      include: {
        thumbnail: true;
      };
    };
  };
}>;

function mapQuestion(
  question: PrismaQuizAttempt["questions"][number],
): RuntimeQuestion {
  return {
    ...question,
    questionId: question.questionId,

    question:
      question.questionSnapshot as unknown as RuntimeQuestion["question"],
    answer: question.answer as unknown as Answer | null,
    evaluation: question.evaluation as unknown as EvaluationResult | null,

    hasSeenFeedback: false,
  };
}

export function mapQuizAttempt(attempt: PrismaQuizAttempt): QuizAttemptRuntime {
  return {
    ...attempt,

    quizSnapshot: attempt.quizSnapshot as unknown as QuizSnapshot,

    settings: {
      timeLimitEnabled: attempt.timeLimitEnabled,
      showExplanations: attempt.showExplanations,
      shuffleQuestions: attempt.shuffleQuestions,
      shuffleAnswers: attempt.shuffleAnswers,
      keyboardShortcutsEnabled: false,
    },

    currentView: "READY",

    questions: [...attempt.questions]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map(mapQuestion),

    saveStatus: "SAVED",
  };
}
