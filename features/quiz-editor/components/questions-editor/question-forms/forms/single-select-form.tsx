import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { Controller, useWatch } from "react-hook-form";
import QuestionField from "../question-field";

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

  return (
    <div className="mt-10">
      {question.title}
      <Controller
        control={control}
        name="info.title"
        render={({ field }) => (
          <QuestionField
            label="Description"
            description="Provide additional details for this question."
            isOptional
          >
            <RichTextEditor
              label="Description"
              description="Provide additional details for this question."
              isOptional
              content={field.value ?? ""}
              onChange={field.onChange}
            />
          </QuestionField>
        )}
      />
    </div>
  );
}
