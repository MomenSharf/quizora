import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { useWatch } from "react-hook-form";

interface Props {
  questionId: string;
}

export function SingleSelectForm({ questionId }: Props) {
  const { control } = useQuizForm();

  const questions = useWatch({
    control,
    name: "questions",
  });

  const question = questions?.find((q) => q.id === questionId);

  if (!question) return null;

  return <div>{question.title}</div>;
}