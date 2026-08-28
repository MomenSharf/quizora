import ExplanationSection from "../explanation-section";
import { AnswerOptionsGroup } from "../options/answer-options-group";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function SingleSelectForm({ questionIndex }: QuestionFormProps) {
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": "var(--question-single)",
        } as React.CSSProperties
      }
    >
      <SectionCard
        type="SINGLE_SELECT"
        title="Single Select"
      >
        <QuestionSection questionIndex={questionIndex} type="SINGLE_SELECT" />
      </SectionCard>
      <SectionCard
        type="SINGLE_SELECT"
        title="Answer Content"
      >
        <AnswerOptionsGroup questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard
        type="SINGLE_SELECT"
        title="Explanation"
      >
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
