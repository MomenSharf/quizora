import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { Controller } from "react-hook-form";
import { ImageUploadPlaceholder } from "../../image-upload/image-upload-placeholder";
import { QuestionFormProps } from "./question-form-router";
import SectionField from "./section-field";
import { QuestionType } from "@/lib/db/generated/prisma/enums";

const QuestionSection = ({  questionIndex, type }: QuestionFormProps & {type: QuestionType}) => {
  const { control } = useQuizForm();

  return (
    <div className="space-y-3">
      <ImageUploadPlaceholder onClick={() => {}}  questionIndex={questionIndex} type={type} />
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
              placeholder="Start typing..."
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
              placeholder="Start typing..."
            />
          )}
        />
      </SectionField>
    </div>
  );
};

export default QuestionSection;
