import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { Controller } from "react-hook-form";
import SectionField from "./section-field";
import { QuestionFormProps } from "./question-form-router";

const ExplanationSection = ({
  question,
  questionIndex,
}: QuestionFormProps) => {
  const { control } = useQuizForm();

  if (!question) return null;

  return (
    <SectionField
      label="Explanation"
      description="Explain why the correct answer is correct or provide additional context."
      optional
    >
      <Controller
        control={control}
        name={`questions.${questionIndex}.explanation`}
        render={({ field }) => (
          <RichTextEditor
            content={field.value ?? ""}
            onChange={field.onChange}
          />
        )}
      />
    </SectionField>
  );
};

export default ExplanationSection;