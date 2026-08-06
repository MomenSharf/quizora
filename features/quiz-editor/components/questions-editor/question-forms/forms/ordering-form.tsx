import ExplanationSection from "../explanation-section";
import { AnswerOptionsGroup } from "../options/answer-options-group";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function OrdeingrForm({ questionIndex }: QuestionFormProps) {
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": 'var(--question-ordering)',
        } as React.CSSProperties
      }
    >
      <SectionCard type="ORDERING" title="Ordering">
        <QuestionSection questionIndex={questionIndex} type="ORDERING" />
      </SectionCard>
      <SectionCard type="ORDERING" title="Answer Content">
        <AnswerOptionsGroup questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="ORDERING" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
