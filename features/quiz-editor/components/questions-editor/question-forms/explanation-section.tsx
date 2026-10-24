import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { Controller } from "react-hook-form";
import SectionField from "./section-field";
import { QuestionFormProps } from "./question-form-router";
import { ImageField } from "../../image-upload/image-field";
import ImagePreviewTrigger from "../../image-upload/image-preview-trigger";

const ExplanationSection = ({ questionIndex }: { questionIndex: number }) => {
  const { control } = useQuizForm();

  return (
    <div className="space-y-3">
      <SectionField
        label="Explanation image"
        description="Provide an image for this explanation."
        optional
      >
        <ImageField
          name={`questions.${questionIndex}.explanationImage`}
          trigger={(props) => (
            <ImagePreviewTrigger title="Add explanation image" {...props} />
          )}
        />
      </SectionField>
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
              dataFieldNames={`questions.${questionIndex}.explanation`}
            />
          )}
        />
      </SectionField>
    </div>
  );
};

export default ExplanationSection;
