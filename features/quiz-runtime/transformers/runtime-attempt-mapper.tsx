
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

const DEFAULT_SETTINGS: QuizAttemptRuntime["settings"] = {
  timeLimitEnabled: false,
  timeLimitSeconds: 300,
  showExplanations: true,
  shuffleQuestions: false,
  shuffleAnswers: false,
};

const DEFAULT_QUIZ_SNAPSHOT: QuizSnapshot = {
  title: null,
  description: null,
  thumbnail: null,
  tags: [],
  language: null,
  category: null,
};

function mapQuestion(
  question: PrismaQuizAttempt["questions"][number],
): RuntimeQuestion {
  return {
    id: question.id,
    questionId: question.questionId,
    orderIndex: question.orderIndex,

    question: question.questionSnapshot as unknown as RuntimeQuestion["question"],

    status: question.status,
    answer: question.answer as unknown as Answer | null,
    evaluation: question.evaluation as unknown as EvaluationResult | null,

    earnedPoints: question.earnedPoints,
    maxPoints: question.maxPoints,

    visited: question.visited ,
    flagged: question.flagged ,
    locked: question.locked ,

    startedAt: question.startedAt,
    deadlineAt: question.deadlineAt,
    isQuestionTimerRunning: question.isQuestionTimerRunning,

    timeSpentSeconds: question.timeSpentSeconds,
    answeredAt: question.answeredAt,

    hasSeenFeedback: false,
  };
}

export function mapQuizAttempt(
  attempt: PrismaQuizAttempt,
): QuizAttemptRuntime {
  return {
    id: attempt.id,
    quizId: attempt.quizId,

    quizSnapshot:
      (attempt.quizSnapshot as unknown as QuizSnapshot | null) ??
      DEFAULT_QUIZ_SNAPSHOT,

    environment: attempt.environment,
    mode: attempt.mode,

    settings: {
      timeLimitEnabled:
        attempt.timeLimitEnabled ?? DEFAULT_SETTINGS.timeLimitEnabled,
      timeLimitSeconds:
        attempt.timeLimitSeconds ?? DEFAULT_SETTINGS.timeLimitSeconds,
      showExplanations:
        attempt.showExplanations ?? DEFAULT_SETTINGS.showExplanations,
      shuffleQuestions:
        attempt.shuffleQuestions ?? DEFAULT_SETTINGS.shuffleQuestions,
      shuffleAnswers:
        attempt.shuffleAnswers ?? DEFAULT_SETTINGS.shuffleAnswers,
    },

    status: attempt.status,
    phase: attempt.phase ?? "READY",
    currentView: "READY",

    questions: [...attempt.questions]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map(mapQuestion),

    currentQuestionIndex: attempt.currentQuestionIndex,

    startedAt: attempt.startedAt?.getTime() ?? null,
    lastActivityAt: attempt.lastActivityAt?.getTime() ?? null,
    pausedAt: attempt.pausedAt?.getTime() ?? null,
    completedAt: attempt.completedAt?.getTime() ?? null,
    expiresAt: attempt.expiresAt?.getTime() ?? null,

    saveStatus: "SAVED",
  };
}
