import { EvaluationResult } from "@/features/quiz-runtime/types/evaluation-types";
import { RuntimeQuestion } from "@/features/quiz-runtime/types/runtime-types";

export function evaluateQuestion(
  runtimeQuestion: RuntimeQuestion,
): EvaluationResult {
  const { question, answer } = runtimeQuestion;

  const maxPoints = question?.points ?? 0;

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

    case "MULTIPLE_SELECT": {
      if (
        !answer ||
        answer.type !== "MULTIPLE_SELECT" ||
        answer.optionIds.length === 0
      ) {
        outcome = "UNANSWERED";
        feedback = "No answer submitted.";
        break;
      }

      const correctOptionIds = question.content.correctOptionIds;

      const correctIds = new Set(correctOptionIds);
      const selectedIds = new Set(answer.optionIds);

      const correctSelections = [...selectedIds].filter((id) =>
        correctIds.has(id),
      ).length;

      const incorrectSelections = [...selectedIds].filter(
        (id) => !correctIds.has(id),
      ).length;

      const score = Math.max(0, correctSelections - incorrectSelections);

      earnedPoints = Math.round((score / correctIds.size) * maxPoints);

      isCorrect =
        correctSelections === correctIds.size && incorrectSelections === 0;

      outcome = isCorrect
        ? "CORRECT"
        : earnedPoints > 0
          ? "PARTIALLY_CORRECT"
          : "INCORRECT";

      feedback =
        runtimeQuestion.evaluation?.feedback ??
        (isCorrect
          ? "Excellent! You selected all the correct answers."
          : earnedPoints > 0
            ? "Good effort! You got some of the answers correct."
            : "Not quite! Keep practicing and try again.");

      break;
    }

    case "TRUE_FALSE": {
      if (!answer || answer.type !== "TRUE_FALSE") {
        outcome = "UNANSWERED";
        feedback = "No answer submitted.";
        break;
      }

      isCorrect = answer.value === question.content.correctAnswer;

      earnedPoints = isCorrect ? maxPoints : 0;

      outcome = isCorrect ? "CORRECT" : "INCORRECT";

      feedback =
        runtimeQuestion.evaluation?.feedback ??
        (isCorrect
          ? "Correct! Well done."
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
    accuracy: maxPoints > 0 ? (earnedPoints / maxPoints) * 100 : null,
    feedback,
    explanation: question.explanation ?? null,
    explanationImage: question.explanationImage ?? null,
  };

  return evaluation;
}
