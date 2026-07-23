import { AnswerOptionsGroup } from "../answer-options-group";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function OrdeingrForm({  questionIndex }: QuestionFormProps) {
  return (
    <div className="space-y-5">
      <SectionCard type="ORDERING" title="Ordering">
        <QuestionSection  questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="ORDERING" title="Answer Content">
        <AnswerOptionsGroup questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="SINGLE_SELECT" title="Explanation">
        <ExplanationSection  questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
