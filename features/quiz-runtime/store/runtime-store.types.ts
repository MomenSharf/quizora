import type { Answer } from "../types/answer-types";
import type { EvaluationResult } from "../types/evaluation-types";

import type {
  AttemptSettings,
  QuizAttemptRuntime,
  QuizSnapshot,
  RuntimeEnvironment,
  RuntimePhase,
  RuntimeProgress,
  RuntimeQuestion,
  RuntimeSaveStatus,
  RuntimeStatus,
  RuntimeTimerState,
  RuntimeView,
  SessionMode,
} from "../types/runtime-types";

export type RuntimePersistenceState = {
  error: string | null;
  saveStatus: RuntimeSaveStatus;
  dirty: boolean;
  lastSavedAt: number | null;
  lastAttemptAt: number | null;
};

// --------------------------------------------------
// Runtime error
// --------------------------------------------------

// --------------------------------------------------
// Runtime state
// --------------------------------------------------

export type RuntimeState = {
  // Attempt identity and configuration
  attemptId: string | null;
  quizId: string | null;
  quizSnapshot: QuizSnapshot;
  mode: SessionMode;
  environment: RuntimeEnvironment;
  settings: AttemptSettings | null;

  // Lifecycle
  status: RuntimeStatus;
  phase: RuntimePhase;

  currentView: RuntimeView;

  startedAt: number | null;
  lastActivityAt: number | null;
  pausedAt: number | null;
  completedAt: number | null;
  expiresAt: number | null;

  // Quiz content
  questions: RuntimeQuestion[];

  currentQuestionIndex: number;

  isReviewOpen: boolean;

  // Server synchronization
  persistence: RuntimePersistenceState;

  // Temporary UI state
};

// --------------------------------------------------
// Runtime actions
// --------------------------------------------------

export interface RuntimeActions {
  // Initialization
  initializeAttempt(attempt: QuizAttemptRuntime): void;
  hydrateAttempt(attempt: QuizAttemptRuntime): void;

  // Lifecycle
  setStatus(status: RuntimeStatus): void;
  setPhase(phase: RuntimePhase): void;
  setCurrentView(view: RuntimeView): void;
  startAttempt(startedAt: number): void;
  completeAttempt(completedAt: number): void;

  // Questions and navigation
  setCurrentQuestion(index: number): void;
  goToNextQuestion(): void;
  goToPreviousQuestion(): void;
  toggleQuestionFlag(questionId: string): void;
  lockQuestion(questionId: string): void;
  unlockQuestion(questionId: string): void;

  // Answers and evaluation
  setAnswer(questionId: string, answer: Answer): void;
  clearAnswer(questionId: string): void;
  submitPracticeAnswer(questionId: string): void;
  submitTestAnswer(questionId: string): void;

  markFeedbackAsSeen: (questionId: string) => void;

  timeoutQuestion: (questionId: string, timedOutAt: number) => void;

  // Reset
  reset(): void;
}

export type RuntimeStore = RuntimeState & RuntimeActions;

// --------------------------------------------------
// Default state
// --------------------------------------------------

export const defaultRuntimeTimer: RuntimeTimerState = {
  questionStartedAt: null,
  questionDeadlineAt: null,
  attemptDeadlineAt: null,
  isQuestionTimerRunning: false,
  isAttemptTimerRunning: false,
  enable: false,
};

export const defaultRuntimePersistence: RuntimePersistenceState = {
  error: null,
  saveStatus: "IDLE",
  dirty: false,
  lastSavedAt: null,
  lastAttemptAt: null,
};

export const defaultRuntimeState: RuntimeState = {
  attemptId: null,
  quizId: null,

  mode: "CLASSIC",

  quizSnapshot: {
    title: null,
    description: null,
    thumbnail: null,
    tags: [],
    language: null,
    category: null,
  },

  environment: "PREVIEW",
  settings: null,

  status: "IDLE",
  phase: "READY",

  currentView: "READY",

  startedAt: null,
  lastActivityAt: null,
  pausedAt: null,
  completedAt: null,
  expiresAt: null,

  questions: [],

  currentQuestionIndex: 0,

  isReviewOpen: false,

  persistence: { ...defaultRuntimePersistence },
};
