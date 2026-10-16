import { Prisma } from "@/lib/db/generated/prisma/client";

import type { Answer } from "./answer-types";
import type { EvaluationResult } from "./evaluation-types";

// --------------------------------------------------
// Prisma types
// --------------------------------------------------

export type PrismaQuizAttempt = Prisma.QuizAttemptGetPayload<{
  include: {
    questions: true;
    image: true;
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

// --------------------------------------------------
// Runtime lifecycle
// --------------------------------------------------

export type RuntimePhase =
  | "READY"
  | "QUESTION"
  | "ANSWERING"
  | "ANSWER_LOCKED"
  | "FEEDBACK"
  | "PAUSED"
  | "SUBMITTING"
  | "RESULT"
  | "FINISHED";

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
// Attempt settings
// --------------------------------------------------

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
// Question state
// --------------------------------------------------

export type RuntimeQuestionStatus =
  | "UNANSWERED"
  | "ANSWERED"
  | "SKIPPED";

export type RuntimeQuestion = {
  // Unique ID of this question in the attempt.
  id: string;

  // Original quiz question ID.
  // Nullable for generated or snapshot-only questions.
  questionId: string | null;

  orderIndex: number;

  // Question data loaded from Prisma.
  question: PrismaQuestion;

  status: RuntimeQuestionStatus;

  answer: Answer | null;
  evaluation: EvaluationResult | null;

  earnedPoints: number;

  timeSpentSeconds: number;
  answeredAt: number | null;
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
  quizTitle: string;

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
// Action results
// --------------------------------------------------

export type RuntimeActionResult<T = undefined> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      code?: string;
    };

// --------------------------------------------------
// Runtime inputs
// --------------------------------------------------

export type StartAttemptInput = {
  quizId: string;
  mode: SessionMode;
  environment: RuntimeEnvironment;

  settings?: Partial<
    Omit<AttemptSettings, "version" | "mode">
  >;
};

export type SubmitAnswerInput = {
  attemptId: string;
  questionId: string;
  answer: Answer;
};

export type NavigateQuestionInput = {
  attemptId: string;
  targetIndex: number;
};

export type RetryQuestionInput = {
  attemptId: string;
  questionId: string;
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