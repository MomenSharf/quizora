import { EvaluationResult } from "@/features/quiz-runtime/types/evaluation-types";
import { RuntimeQuestion } from "@/features/quiz-runtime/types/runtime-types";

export function evaluateQuestion(
  runtimeQuestion: RuntimeQuestion,
): EvaluationResult {
  const {
    question,
    answer,
    evaluation: runtimeQuestionEvalution,
  } = runtimeQuestion;

  const maxPoints = runtimeQuestionEvalution?.maxPoints ?? 0;

  let isCorrect: boolean | null = false;
  let outcome: EvaluationResult["outcome"] = "INCORRECT";
  let status: EvaluationResult["status"] = "EVALUATED";
  let feedback: string | null = null;
  let earnedPoints = 0;

  switch (question.type) {
    case "SINGLE_SELECT": {
      if (!answer || answer.type !== "SINGLE_SELECT") {
        outcome = "UNANSWERED";
        feedback = "No answer submitted.";
        break;
      }

      const correctOptionId = question.content.correctOptionId;

      isCorrect = answer.optionId === correctOptionId;

      earnedPoints = isCorrect ? maxPoints : 0;
      outcome = isCorrect ? "CORRECT" : "INCORRECT";
      feedback =
        runtimeQuestion.evaluation?.feedback ??
        (isCorrect
          ? "Excellent! You got the correct answer."
          : "Not quite! Keep practicing and try again.");

      break;
    }

    default: {
      status = "NOT_GRADED";
      outcome = "NOT_APPLICABLE";
      isCorrect = null;
      feedback = "Evaluation is not available for this question type.";
      break;
    }
  }

  const evaluation: EvaluationResult = {
    isCorrect,
    earnedPoints,
    maxPoints,
    status,
    outcome,
    evaluatedAt: Date.now(),
    parts: [],
    visibility: {
      showCorrectAnswer: true,
      showEarnedPoints: true,
      showExplanation: true,
      showFeedback: true,
    },
    accuracy: maxPoints > 0 ? (earnedPoints / maxPoints) * 100 : null,
    feedback,
    explanation: question.explanation ?? null,
    explanationImage: question.explanationImage ?? null,
  };

  return evaluation;
}
