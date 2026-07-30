import ExplanationSection from "../explanation-section";
import Accepted from "../gess/accepted";
import ContentTabs from "../gess/content-tabs";
import HintsGroup from "../gess/hint-group";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function GessForm({ questionIndex }: QuestionFormProps) {
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": "var(--question-guess)",
        } as React.CSSProperties
      }
    >
      <SectionCard type="GUESS" title="Guesses">
        <QuestionSection questionIndex={questionIndex} type="GUESS" />
      </SectionCard>
      <SectionCard type="GUESS" title="Guesses">
        <div className="space-y-5">
          <ContentTabs questionIndex={questionIndex} />
          <HintsGroup questionIndex={questionIndex} />
          <Accepted questionIndex={questionIndex} />
        </div>
      </SectionCard>
      <SectionCard type="GUESS" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
