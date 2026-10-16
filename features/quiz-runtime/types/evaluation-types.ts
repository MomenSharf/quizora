export type EvaluationStatus =
  | "PENDING"
  | "EVALUATED"
  | "NOT_GRADED";

export type EvaluationOutcome =
  | "CORRECT"
  | "PARTIALLY_CORRECT"
  | "INCORRECT"
  | "UNANSWERED"
  | "NOT_APPLICABLE";

export type EvaluationVisibility = {
  showCorrectAnswer: boolean;
  showExplanation: boolean;
  showFeedback: boolean;
  showEarnedPoints: boolean;
};

export type EvaluationPartResult = {
  partId: string;
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
  feedback?: string;
};

export type EvaluationResult = {
  status: EvaluationStatus;
  outcome: EvaluationOutcome;

  isCorrect: boolean | null;

  earnedPoints: number;
  maxPoints: number;

  accuracy: number | null;

  feedback: string | null;
  explanation: string | null;

  parts: EvaluationPartResult[];

  evaluatedAt: number | null;
  visibility: EvaluationVisibility;
};

export type ScoreSummary = {
  score: number;
  totalPoints: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  partiallyCorrectAnswers: number;
  accuracy: number | null;
  completionPercentage: number;
};

export type QuestionEvaluationInput = {
  questionId: string;
  answer: import("./answer-types").Answer | null;
  timeSpentSeconds: number;
};

export type EvaluationPolicy = {
  allowPartialCredit: boolean;
  showCorrectAnswer: boolean;
  showExplanation: boolean;
  showFeedback: boolean;
  showEarnedPoints: boolean;
};

export type EvaluateAnswerResult = {
  questionId: string;
  evaluation: EvaluationResult;
};

export type FinalAttemptResult = {
  attemptId: string;
  status: "COMPLETED" | "EXPIRED";

  score: number;
  totalPoints: number;
  accuracy: number | null;

  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  partiallyCorrectAnswers: number;
  unansweredQuestions: number;

  elapsedSeconds: number;
  completedAt: number;

  canReviewAnswers: boolean;
};