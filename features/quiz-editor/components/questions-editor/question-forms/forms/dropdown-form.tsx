import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { Controller } from "react-hook-form";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";
import SectionField from "../section-field";
import { AnswerOptionsGroup } from "../options/answer-options-group";

export function DropdownForm({ questionIndex  }: QuestionFormProps) {
  
  const { control } = useQuizForm();
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": 'var(--question-dropdown)',
        } as React.CSSProperties
      }
    >
      <SectionCard type="DROPDOWN" title="Dropdown" >
        <QuestionSection questionIndex={questionIndex} type="DROPDOWN" />
      </SectionCard>
      <SectionCard type="DROPDOWN" title="Answer Options">
        <div className="space-y-5">
          <SectionField
            label="Label"
            description="Provide a label for this dropdown."
            required
            className="px-4"
          >
            <Controller
              control={control}
              name={`questions.${questionIndex}.content.label`}
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
          <AnswerOptionsGroup questionIndex={questionIndex} />
        </div>
      </SectionCard>
      <SectionCard type="DROPDOWN" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
