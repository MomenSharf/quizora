import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { Controller } from "react-hook-form";
import { ImageField } from "../../image-upload/image-field";
import ImagePreviewTrigger from "../../image-upload/image-preview-trigger";
import SectionField from "./section-field";
import { FieldError } from "../../issues/field-error";

const QuestionSection = ({ questionIndex }: { questionIndex: number }) => {
  const { control } = useQuizForm();

  return (
    <div className="space-y-3">
      <ImageField
        name={`questions.${questionIndex}.image`}
        trigger={(props) => <ImagePreviewTrigger {...props} />}
      />
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
              placeholder="Start typing..."
              dataFieldNames={`questions.${questionIndex}.title`}
            />
          )}
        />
        <FieldError
          control={control}
          name={`questions.${questionIndex}.title`}
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
              dataFieldNames={`questions.${questionIndex}.description`}
              onChange={field.onChange}
              placeholder="Start typing..."
            />
          )}
        />
        <FieldError
          control={control}
          name={`questions.${questionIndex}.description`}
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
              dataFieldNames={`questions.${questionIndex}.hint`}
              onChange={field.onChange}
              placeholder="Start typing..."
            />
          )}
        />
        <FieldError
          control={control}
          name={`questions.${questionIndex}.hint`}
        />
      </SectionField>
    </div>
  );
};

export default QuestionSection;
