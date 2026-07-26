import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";
import { TapFindEditor } from "../tap-find/tap-find-editor";

export function TapFindForm({ questionIndex }: QuestionFormProps) {
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": "var(--question-tap-find)",
        } as React.CSSProperties
      }
    >
      <SectionCard type="TAP_FIND" title="Tap & Find">
        <QuestionSection questionIndex={questionIndex} type="TAP_FIND" />
      </SectionCard>
      <SectionCard type="TAP_FIND" title="Answer Content">
        <TapFindEditor questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="TAP_FIND" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
