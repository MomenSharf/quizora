import QuestionSection from "../question-section";
import QuestionSectionTitle from "../section-title";
import { SectionCard } from "../section-card";
import { AnswerOptions } from "../answer-options";
import { QuestionFormProps } from "../question-form-router";



export function SingleSelectForm({ question, questionIndex }: QuestionFormProps) {
  return (
    <div className="space-y-5">
      <SectionCard
        title={
          <QuestionSectionTitle type="SINGLE_SELECT" title="Single Select" />
        }
      >
        <QuestionSection question={question} questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard
        title={
          <QuestionSectionTitle type="SINGLE_SELECT" title="Answer Content" />
        }
      >
     <AnswerOptions questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
