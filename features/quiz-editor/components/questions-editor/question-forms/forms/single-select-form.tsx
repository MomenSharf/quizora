import ExplanationSection from "../explanation-section";
import { AnswerOptionsGroup } from "../options/answer-options-group";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function SingleSelectForm({ questionIndex, toggleConfig }: QuestionFormProps) {
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
        toggleConfig={toggleConfig}
      >
        <QuestionSection questionIndex={questionIndex} type="SINGLE_SELECT" />
      </SectionCard>
      <SectionCard
        type="SINGLE_SELECT"
        title="Answer Content"
        toggleConfig={toggleConfig}
      >
        <AnswerOptionsGroup questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard
        type="SINGLE_SELECT"
        title="Explanation"
        toggleConfig={toggleConfig}
      >
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
