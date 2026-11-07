import { ImageData } from "@/features/quiz-editor/validation/image";

export type EvaluationStatus = "PENDING" | "EVALUATED" | "NOT_GRADED";

export type EvaluationOutcome =
  | "CORRECT"
  | "PARTIALLY_CORRECT"
  | "INCORRECT"
  | "UNANSWERED"
  | "TIMEOUT"
  | "NOT_APPLICABLE";

export type EvaluationResult = {
  status: EvaluationStatus;
  outcome: EvaluationOutcome;

  isCorrect: boolean | null;

  earnedPoints: number;
  maxPoints: number;

  accuracy: number | null;

  feedback: string | null;
  explanation: string | null;
  explanationImage: ImageData | null;
};
