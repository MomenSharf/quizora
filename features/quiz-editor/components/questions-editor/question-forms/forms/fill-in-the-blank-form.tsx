import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function FillinTheBlankForm({
  question,
  questionIndex,
}: QuestionFormProps) {
  return (
    <div className="space-y-5">
      <SectionCard type="FILL_BLANK" title="Fill in the Blank">
        <QuestionSection question={question} questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="FILL_BLANK" title="Blanks">
        content
      </SectionCard>
      <SectionCard type="FILL_BLANK" title="Explanation">
        <ExplanationSection question={question} questionIndex={questionIndex} />
      </SectionCard>
      
    </div>
  );
}
