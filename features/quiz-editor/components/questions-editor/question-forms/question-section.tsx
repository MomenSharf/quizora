import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { Controller, useWatch } from "react-hook-form";
import QuestionEditorField from "./question-editor-field";
import QuestionSectionHeader from "./question-section-header";

const QuestionSection = ({ questionId }: { questionId: string }) => {
  const { control } = useQuizForm();

  const questions = useWatch({
    control,
    name: "questions",
  });

  const question = questions?.find((q) => q.id === questionId);
  const questionIndex = questions?.findIndex((q) => q.id === questionId);

  if (!question) return null;
  return (
    <div className="bg-card rounded-lg">
      <QuestionSectionHeader question={question} />
      <div className="p-5 space-y-3">
        <QuestionEditorField
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
        </QuestionEditorField>
        <QuestionEditorField
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
        </QuestionEditorField>
        <QuestionEditorField
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
        </QuestionEditorField>
      </div>
    </div>
  );
};

export default QuestionSection;
