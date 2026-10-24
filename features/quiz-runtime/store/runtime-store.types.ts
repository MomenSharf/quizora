import type { Answer } from "../types/answer-types";
import type { EvaluationResult } from "../types/evaluation-types";
import type {
  AttemptSettings,
  QuizAttemptRuntime,
  RuntimeEnvironment,
  RuntimePhase,
  RuntimeProgress,
  RuntimeQuestion,
  RuntimeQuestionStatus,
  RuntimeSaveStatus,
  RuntimeStatus,
  RuntimeTimerState,
  SessionMode,
} from "../types/runtime-types";



export type RuntimeAnswerState = {
  questionId: string;
  answer: Answer | null;
  evaluation: EvaluationResult | null;
  status: RuntimeQuestionStatus;
  isDirty: boolean;
  lastModifiedAt: number | null;
};

export type RuntimeQuestionState = {
  currentIndex: number;
  visitedQuestionIds: string[];
  flaggedQuestionIds: string[];
  lockedQuestionIds: string[];
};

export type RuntimeFeedbackState = {
  questionId: string | null;
  evaluation: EvaluationResult | null;
  visible: boolean;
};

export type RuntimeSubmissionState = {
  isSubmitting: boolean;
  isConfirmed: boolean;
  unansweredQuestionIds: string[];
  submittedAt: number | null;
};

export type RuntimePersistenceState = {
  saveState: RuntimeSaveStatus;
  error: string | null;
  dirty: boolean;
  lastSavedAt: number | null;
  lastAttemptAt: number | null;
};

export type RuntimeLoadingState = {
  isStarting: boolean;
  isLoading: boolean;
  isPausing: boolean;
  isResuming: boolean;
  isCompleting: boolean;
  isLeaving: boolean;
};

export type RuntimeError = {
  code: string;
  message: string;
  questionId?: string;
};

export type RuntimeState = {
  // Attempt identity and configuration
  attemptId: string | null;
  quizId: string | null;
  quizTitle: string | null;
  quizDescription: string | null;
  environment: RuntimeEnvironment;
  mode: SessionMode;
  settings: AttemptSettings | null;

  // Runtime lifecycle
  status: RuntimeStatus;
  phase: RuntimePhase;
  startedAt: number | null;
  lastActivityAt: number | null;
  pausedAt: number | null;
  completedAt: number | null;
  expiresAt: number | null;

  // Quiz content and answers
  questions: RuntimeQuestion[];
  answers: Record<string, RuntimeAnswerState>;

  // Gameplay progress
  progress: RuntimeProgress;
  questionState: RuntimeQuestionState;
  timer: RuntimeTimerState;

  // Feedback and final submission
  feedback: RuntimeFeedbackState;
  submission: RuntimeSubmissionState;

  // Saving and server synchronization
  persistence: RuntimePersistenceState;

  // Temporary UI/loading state
  loading: RuntimeLoadingState;
  error: RuntimeError | null;
};

export interface RuntimeActions {
  // Attempt initialization and hydration
  initializeAttempt(attempt: QuizAttemptRuntime): void;
  hydrateAttempt(attempt: QuizAttemptRuntime): void;
  clearAttempt(): void;

  // Attempt configuration
  setEnvironment(environment: RuntimeEnvironment): void;
  setMode(mode: SessionMode): void;
  setSettings(settings: AttemptSettings): void;

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
  setQuestions(questions: RuntimeQuestion[]): void;
  setCurrentQuestion(index: number): void;
  goToNextQuestion(): void;
  goToPreviousQuestion(): void;
  goToQuestion(index: number): void;
  markQuestionVisited(questionId: string): void;
  toggleQuestionFlag(questionId: string): void;
  lockQuestion(questionId: string): void;
  unlockQuestion(questionId: string): void;

  // Answers
  setAnswer(questionId: string, answer: Answer): void;
  clearAnswer(questionId: string): void;
  setAnswerEvaluation(
    questionId: string,
    evaluation: EvaluationResult,
  ): void;
  setAnswerState(
    questionId: string,
    state: Partial<RuntimeAnswerState>,
  ): void;
  markAnswerSaved(questionId: string): void;

  // Question progress and scoring
  setQuestionStatus(
    questionId: string,
    status: RuntimeQuestionStatus,
  ): void;
  setQuestionTimeSpent(
    questionId: string,
    timeSpentSeconds: number,
  ): void;
  setProgress(progress: Partial<RuntimeProgress>): void;
  recalculateProgress(): void;

  // Timers
  setTimer(timer: Partial<RuntimeTimerState>): void;
  startQuestionTimer(startedAt: number, deadlineAt: number | null): void;
  stopQuestionTimer(): void;
  setAttemptDeadline(deadlineAt: number | null): void;

  // Feedback
  showFeedback(
    questionId: string,
    evaluation: EvaluationResult,
  ): void;
  hideFeedback(): void;
  clearFeedback(): void;

  // Submission
  setSubmitting(isSubmitting: boolean): void;
  setSubmitConfirmation(isConfirmed: boolean): void;
  setUnansweredQuestions(questionIds: string[]): void;
  setSubmittedAt(timestamp: number): void;

  // Persistence
  setSaveState(state: RuntimeSaveStatus): void;
  setSaveError(error: string | null): void;
  setDirty(dirty: boolean): void;
  setLastSavedAt(timestamp: number | null): void;
  setLastAttemptAt(timestamp: number | null): void;
  markAllAnswersSaved(): void;

  // Loading and errors
  setLoadingState(state: Partial<RuntimeLoadingState>): void;
  setError(error: RuntimeError | null): void;
  clearError(): void;

  // Reset
  resetQuestionState(): void;
  resetSubmission(): void;
  reset(): void;
}

export type RuntimeStore = RuntimeState & RuntimeActions;

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

export const defaultRuntimeQuestionState: RuntimeQuestionState = {
  currentIndex: 0,
  visitedQuestionIds: [],
  flaggedQuestionIds: [],
  lockedQuestionIds: [],
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
  saveState: "IDLE",
  error: null,
  dirty: false,
  lastSavedAt: null,
  lastAttemptAt: null,
};

export const defaultRuntimeLoading: RuntimeLoadingState = {
  isStarting: false,
  isLoading: false,
  isPausing: false,
  isResuming: false,
  isCompleting: false,
  isLeaving: false,
};

export const defaultRuntimeState: RuntimeState = {
  attemptId: null,
  quizId: null,
  quizTitle: null,
  quizDescription: null,
  environment: "PREVIEW",
  mode: "PRACTICE",
  settings: null,

  status: "IDLE",
  phase: "READY",
  startedAt: null,
  lastActivityAt: null,
  pausedAt: null,
  completedAt: null,
  expiresAt: null,

  questions: [],
  answers: {},

  progress: defaultRuntimeProgress,
  questionState: defaultRuntimeQuestionState,
  timer: defaultRuntimeTimer,

  feedback: defaultRuntimeFeedback,
  submission: defaultRuntimeSubmission,

  persistence: defaultRuntimePersistence,
  loading: defaultRuntimeLoading,
  error: null,
};