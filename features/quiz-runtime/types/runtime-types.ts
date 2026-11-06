import type { Prisma } from "@/lib/db/generated/prisma/client";
import type { Question } from "@/features/quiz-editor/validation/question";
import type { ImageData } from "@/features/quiz-editor/validation/image";

import type { Answer } from "./answer-types";
import type { EvaluationResult } from "./evaluation-types";

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

export type RuntimeEnvironment = "PREVIEW" | "PRODUCTION";

export type SessionMode = "CLASSIC" | "TEST";

export type AttemptSettings = {
  timeLimitEnabled: boolean;
  timeLimitSeconds: number;
  showExplanations: boolean;
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
};

export type RuntimeView =
  "READY" | "QUESTION" | "SETTINGS" | "REVIEW" | "RESULTS";

export type RuntimePhase = "READY" | "QUESTION" | "RESULT";

export type RuntimeStatus = "IDLE" | "IN_PROGRESS" | "COMPLETED" | "EXPIRED";

export type RuntimeSaveStatus =
  "IDLE" | "PENDING" | "SAVING" | "SAVED" | "ERROR" | "OFFLINE";

export type RuntimeQuestionStatus = "UNANSWERED" | "ANSWERED" | "TIMED_OUT";

export type RuntimeQuestion = {
  id: string;
  questionId: string;
  orderIndex: number;

  question: Question;

  status: RuntimeQuestionStatus;

  answer: Answer | null;
  evaluation: EvaluationResult | null;

  earnedPoints: number;
  maxPoints: number;

  flagged: boolean;
  locked: boolean;
  visited: boolean;

  startedAt: Date | null;
  deadlineAt: Date | null;
  isQuestionTimerRunning: boolean;

  timeSpentSeconds: number;
  answeredAt: Date | null;
  evaluatedAt: Date | null;

  hasSeenFeedback: boolean;
};

export type QuizSnapshot = {
  title: string | null;
  description: string | null;
  thumbnail: ImageData | null;
  tags: string[];
  language: string | null;
  category: string | null;
};

// --------------------------------------------------
// Main runtime state
// --------------------------------------------------

export type QuizAttemptRuntime = {
  id: string;
  quizId: string;
  quizSnapshot: QuizSnapshot;

  environment: RuntimeEnvironment;
  mode: SessionMode;
  settings: AttemptSettings;

  status: RuntimeStatus;
  phase: RuntimePhase;

  currentView: RuntimeView;

  questions: RuntimeQuestion[];

  currentQuestionIndex: number;

  startedAt: number | null;
  lastActivityAt: number | null;
  pausedAt: number | null;
  completedAt: number | null;
  expiresAt: number | null;

  saveStatus: RuntimeSaveStatus;
};

export type GameplayAction = "PASS" | "SUBMIT" | "NEXT" | "FINISH" | "RESULTS";
