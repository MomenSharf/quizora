import {
  Prisma
} from "@/lib/db/generated/prisma/client";

import { mapQuestion as mapPrismaQuestion } from "@/features/quiz-editor/transformers/quiz-mapper";
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

export type PrismaPreviewQuiz = Prisma.QuizGetPayload<{
  include: {
    questions: {
      include: {
        image: true;
        explanationImage: true;
      };
    };
    thumbnail: true;
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
  };
}

export function mapPreviewAttemptQuestions(
  question: PrismaPreviewQuiz["questions"][number],
  index: number,
): RuntimeQuestion {
  return {
    id: crypto.randomUUID(),
    questionId: question.id,
    orderIndex: index,

    question: mapPrismaQuestion(question),

    status: "UNANSWERED",

    answer: null,
    evaluation: null,

    earnedPoints: 0,
    maxPoints: question.points,

    flagged: false,
    locked: false,
    visited: false,

    startedAt: null,
    deadlineAt: null,
    isQuestionTimerRunning: false,
    timeLimitSeconds: question.timeLimitSeconds,

    timeSpentSeconds: null,
    answeredAt: null,
    evaluatedAt: null,

    hasSeenFeedback: false,
  };
}
