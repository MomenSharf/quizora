import { AnswerOptions } from "../answer-options";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function MultipleSelectForm({
  question,
  questionIndex,
}: QuestionFormProps) {
  return (
    <div className="space-y-5">
      <SectionCard type="MULTIPLE_SELECT" title="Multiple Select">
        <QuestionSection question={question} questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="MULTIPLE_SELECT" title="Answer Content">
        <AnswerOptions questionIndex={questionIndex} />
      </SectionCard>
       <SectionCard type="SINGLE_SELECT" title="Explanation">
        <ExplanationSection question={question} questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
