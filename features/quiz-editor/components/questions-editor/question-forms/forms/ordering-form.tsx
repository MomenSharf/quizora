import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { AnswerOptionsGroup } from "../answer-options-group";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function OrdeingrForm({ questionIndex }: QuestionFormProps) {
  const color = QUESTION_TYPE_COLORS.ORDERING;
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": `${color}`,
        } as React.CSSProperties
      }
    >
      <SectionCard type="ORDERING" title="Ordering">
        <QuestionSection questionIndex={questionIndex} type="ORDERING" />
      </SectionCard>
      <SectionCard type="ORDERING" title="Answer Content">
        <AnswerOptionsGroup questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="SINGLE_SELECT" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
