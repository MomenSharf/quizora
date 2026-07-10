import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { QuizEditor } from "../validation/quiz";
import { useQuizForm } from "./use-quiz-form";

export function useQuestion<T extends QuizEditor["questions"][number]>(
  questionId: string | null | undefined,
) {
  const { control } = useQuizForm();

  const questions = useWatch({
    control,
    name: "questions",
  });

  const questionIndex = useMemo(() => {
    if (!questionId || !questions) {
      return -1;
    }

    return questions.findIndex((question) => question.id === questionId);
  }, [questionId, questions]);

  return {
    question:
      questionIndex >= 0
        ? (questions?.[questionIndex] as T)
        : undefined,
    questionIndex,
    found: questionIndex >= 0,
  };
}