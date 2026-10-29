
import type { Prisma } from "@/lib/db/generated/prisma/client";
import type { Question } from "@/features/quiz-editor/validation/question";
import type { ImageData } from "@/features/quiz-editor/validation/image";

import type { Answer } from "./answer-types";
import type { EvaluationResult } from "./evaluation-types";

// --------------------------------------------------
// Prisma types
// --------------------------------------------------

export type PrismaQuizAttempt = Prisma.QuizAttemptGetPayload<{
  include: {
    questions: {
      orderBy: {
        orderIndex: "asc";
      };
    };
    quiz: {
      include: {
        thumbnail: true;
      };
    };
  };
}>;

export type PrismaQuestion = Prisma.QuestionGetPayload<{
  include: {
    image: true;
  };
}>;

// --------------------------------------------------
// Runtime configuration
// --------------------------------------------------

export type RuntimeEnvironment = "PREVIEW" | "PRODUCTION";

export type SessionMode = "PRACTICE" | "TEST";

export type QuestionNavigation = "SEQUENTIAL" | "FREE";

export type QuestionResultVisibility =
  | "IMMEDIATE"
  | "AFTER_SUBMISSION"
  | "HIDDEN";

export type ScoreVisibility =
  | "ALWAYS"
  | "AFTER_QUESTION"
  | "AFTER_SUBMISSION"
  | "HIDDEN";

export type AttemptSettings = {
  version: 1;
  mode: SessionMode;

  navigation: QuestionNavigation;

  allowSkip: boolean;
  allowQuestionRetry: boolean;
  allowAnswerChange: boolean;

  questionTimerEnabled: boolean;
  defaultQuestionTimeLimit: number | null;

  totalTimerEnabled: boolean;
  totalTimeLimitSeconds: number | null;

  resultVisibility: QuestionResultVisibility;
  scoreVisibility: ScoreVisibility;

  showExplanations: boolean;

  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
};

// --------------------------------------------------
// Runtime lifecycle
// --------------------------------------------------

export type RuntimePhase =
  | "READY"
  | "QUESTION"
  | "PAUSED"
  | "RESULT";

export type RuntimeStatus =
  | "IDLE"
  | "IN_PROGRESS"
  | "PAUSED"
  | "COMPLETED"
  | "ABANDONED"
  | "EXPIRED";

export type RuntimeSaveStatus =
  | "IDLE"
  | "PENDING"
  | "SAVING"
  | "SAVED"
  | "ERROR"
  | "OFFLINE";

// --------------------------------------------------
// Question state
// --------------------------------------------------

export type RuntimeQuestionStatus =
  | "UNANSWERED"
  | "ANSWERED"
  | "SKIPPED";

export type RuntimeQuestion = {
  id: string;
  questionId: string | null;
  orderIndex: number;

  question: Question;

  status: RuntimeQuestionStatus;

  answer: Answer | null;
  evaluation: EvaluationResult | null;

  earnedPoints: number;
  maxPoints: number;

  flagged: boolean;
  locked: boolean;

  timeSpentSeconds: number;
  answeredAt: number | null;
};

// --------------------------------------------------
// Quiz snapshot
// --------------------------------------------------

export type QuizSnapshot = {
  title: string | null;
  description: string | null;
  thumbnail: ImageData | null;
  tags: string[];
  language: string | null;
  category: string | null;
};

// --------------------------------------------------
// Runtime progress
// --------------------------------------------------

export type RuntimeProgress = {
  currentQuestionIndex: number;

  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  skippedQuestions: number;

  score: number;
  totalPoints: number;

  elapsedSeconds: number;
  remainingSeconds: number | null;
};

// --------------------------------------------------
// Runtime timers
// --------------------------------------------------

export type RuntimeTimerState = {
  questionStartedAt: number | null;
  questionDeadlineAt: number | null;
  attemptDeadlineAt: number | null;

  isQuestionTimerRunning: boolean;
  isAttemptTimerRunning: boolean;
};

// --------------------------------------------------
// Main runtime state
// --------------------------------------------------

export type QuizAttemptRuntime = {
  id: string;
  quizId: string;
  quizSnapshot: QuizSnapshot;

  environment: RuntimeEnvironment;
  settings: AttemptSettings;

  status: RuntimeStatus;
  phase: RuntimePhase;

  questions: RuntimeQuestion[];

  progress: RuntimeProgress;
  timer: RuntimeTimerState;

  startedAt: number | null;
  lastActivityAt: number | null;
  pausedAt: number | null;
  completedAt: number | null;
  expiresAt: number | null;

  saveStatus: RuntimeSaveStatus;
};




// --------------------------------------------------
// Attempt summary
// --------------------------------------------------

export type AttemptSummary = {
  id: string;
  quizId: string;
  quizTitle: string;

  mode: SessionMode;
  status: RuntimeStatus;

  totalQuestions: number;
  answeredQuestions: number;

  score: number;
  totalPoints: number;

  startedAt: number;
  lastActivityAt: number;
  completedAt: number | null;
};
