import { AnswerOptionsGroup } from "../answer-options-group";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function SingleSelectForm({
  questionIndex,
}: QuestionFormProps) {
  return (
    <div className="space-y-5">
      <SectionCard type="SINGLE_SELECT" title="Single Select">
        <QuestionSection  questionIndex={questionIndex} type="SINGLE_SELECT" />
      </SectionCard>
      <SectionCard type="SINGLE_SELECT" title="Answer Content">
        <AnswerOptionsGroup questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="SINGLE_SELECT" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
      
    </div>
  );
}
