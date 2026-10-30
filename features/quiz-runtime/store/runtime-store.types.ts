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
} from "../types/runtime-types";

// --------------------------------------------------
// Feedback state
// --------------------------------------------------

export type RuntimeFeedbackState = {
  questionId: string | null;
  evaluation: EvaluationResult | null;
  visible: boolean;
};

// --------------------------------------------------
// Final attempt submission state
// --------------------------------------------------

export type RuntimeSubmissionState = {
  isSubmitting: boolean;
  isConfirmed: boolean;
  unansweredQuestionIds: string[];
  submittedAt: number | null;
};

// --------------------------------------------------
// Persistence state
// --------------------------------------------------

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

export type RuntimeError = {
  code: string;
  message: string;
  questionId?: string;
};

// --------------------------------------------------
// Runtime state
// --------------------------------------------------

export type RuntimeState = {
  // Attempt identity and configuration
  attemptId: string | null;
  quizId: string | null;
  quizSnapshot: QuizSnapshot;
  environment: RuntimeEnvironment;
  settings: AttemptSettings | null;

  // Lifecycle
  status: RuntimeStatus;
  phase: RuntimePhase;

  startedAt: number | null;
  lastActivityAt: number | null;
  pausedAt: number | null;
  completedAt: number | null;
  expiresAt: number | null;

  // Quiz content
  questions: RuntimeQuestion[];

  // Gameplay
  progress: RuntimeProgress;
  timer: RuntimeTimerState;

  // Feedback and final submission
  feedback: RuntimeFeedbackState;
  submission: RuntimeSubmissionState;

  // Server synchronization
  persistence: RuntimePersistenceState;

  // Temporary UI state
  error: RuntimeError | null;
};

// --------------------------------------------------
// Runtime actions
// --------------------------------------------------

export interface RuntimeActions {
  // Initialization
  initializeAttempt(attempt: QuizAttemptRuntime): void;
  hydrateAttempt(attempt: QuizAttemptRuntime): void;
  clearAttempt(): void;

  // Lifecycle
  setStatus(status: RuntimeStatus): void;
  setPhase(phase: RuntimePhase): void;
  startAttempt(startedAt: number): void;
  pauseAttempt(pausedAt: number): void;
  resumeAttempt(resumedAt: number): void;
  completeAttempt(completedAt: number): void;
  abandonAttempt(): void;
  updateLastActivity(timestamp: number): void;

  // Questions and navigation
  setCurrentQuestion(index: number): void;
  goToQuestion(index: number): void;
  goToNextQuestion(): void;
  goToPreviousQuestion(): void;
  toggleQuestionFlag(questionId: string): void;
  lockQuestion(questionId: string): void;
  unlockQuestion(questionId: string): void;

  // Answers and evaluation
  setAnswer(questionId: string, answer: Answer): void;
  clearAnswer(questionId: string): void;
  setAnswerEvaluation(questionId: string, evaluation: EvaluationResult): void;
  submitPracticeAnswer(questionId: string): void;

  markFeedbackAsSeen: (questionId: string) => void;

  // Progress and scoring
  setProgress(progress: Partial<RuntimeProgress>): void;
  recalculateProgress(): void;

  // Persistence
  // set{ersistence

  // Loading and errors
  setError(error: RuntimeError | null): void;
  clearError(): void;

  // Reset
  reset(): void;
}

export type RuntimeStore = RuntimeState & RuntimeActions;

// --------------------------------------------------
// Default state
// --------------------------------------------------

export const defaultRuntimeProgress: RuntimeProgress = {
  currentQuestionIndex: 0,
  totalQuestions: 0,
  answeredQuestions: 0,
  correctAnswers: 0,
  skippedQuestions: 0,
  score: 0,
  totalPoints: 0,
  elapsedSeconds: 0,
  remainingSeconds: null,
};

export const defaultRuntimeTimer: RuntimeTimerState = {
  questionStartedAt: null,
  questionDeadlineAt: null,
  attemptDeadlineAt: null,
  isQuestionTimerRunning: false,
  isAttemptTimerRunning: false,
};

export const defaultRuntimeFeedback: RuntimeFeedbackState = {
  questionId: null,
  evaluation: null,
  visible: false,
};

export const defaultRuntimeSubmission: RuntimeSubmissionState = {
  isSubmitting: false,
  isConfirmed: false,
  unansweredQuestionIds: [],
  submittedAt: null,
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

  startedAt: null,
  lastActivityAt: null,
  pausedAt: null,
  completedAt: null,
  expiresAt: null,

  questions: [],

  progress: { ...defaultRuntimeProgress },
  timer: { ...defaultRuntimeTimer },

  feedback: { ...defaultRuntimeFeedback },
  submission: { ...defaultRuntimeSubmission },

  persistence: { ...defaultRuntimePersistence },

  error: null,
};
