import { AnswerOptions } from "../answer-options";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function OrdeingrForm({
  question,
  questionIndex,
}: QuestionFormProps) {
  return (
    <div className="space-y-5">
      <SectionCard type="ORDERING" title="Ordering">
        <QuestionSection question={question} questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="ORDERING" title="Answer Content">
        <AnswerOptions questionIndex={questionIndex} />
      </SectionCard>
       <SectionCard type="SINGLE_SELECT" title="Explanation">
        <ExplanationSection question={question} questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
