import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { Controller, useWatch } from "react-hook-form";
import SectionField from "./section-field";
import { QuestionFormProps } from "./question-form-router";

const QuestionSection = ({ question, questionIndex }: QuestionFormProps) => {
  const { control } = useQuizForm();

  if (!question) return null;
  return (
    <div className="space-y-3">
      <SectionField
        label="Title"
        description="Provide a title for this question."
        required
      >
        <Controller
          control={control}
          name={`questions.${questionIndex}.title`}
          render={({ field }) => (
            <RichTextEditor
              content={field.value ?? ""}
              onChange={field.onChange}
              className="text-2xl font-semibold"
              fontSize="24px"
            />
          )}
        />
      </SectionField>
      <SectionField
        label="Description"
        description="Provide a description for this question."
        optional
      >
        <Controller
          control={control}
          name={`questions.${questionIndex}.description`}
          render={({ field }) => (
            <RichTextEditor
              content={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
      </SectionField>
      <SectionField
        label="Hint"
        description="Provide a hint for this question."
        optional
      >
        <Controller
          control={control}
          name={`questions.${questionIndex}.hint`}
          render={({ field }) => (
            <RichTextEditor
              content={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
      </SectionField>
    </div>
  );
};

export default QuestionSection;
