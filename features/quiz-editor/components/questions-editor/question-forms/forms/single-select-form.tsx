import { useState } from "react";
import ExplanationSection from "../explanation-section";
import { AnswerOptionsGroup } from "../options/answer-options-group";
import { ConfigSheet } from "../question-config/sheet";
import { SingleSelectConfig } from "../question-config/types/single-select-config";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function SingleSelectForm({ questionIndex }: QuestionFormProps) {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const openConfig = () => setIsConfigOpen(true);
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": "var(--question-single)",
        } as React.CSSProperties
      }
    >
      <SectionCard type="SINGLE_SELECT" title="Single Select" openConfig={openConfig}>
        <QuestionSection questionIndex={questionIndex} type="SINGLE_SELECT" />
      </SectionCard>
      <SectionCard type="SINGLE_SELECT" title="Answer Content" openConfig={openConfig}>
        <AnswerOptionsGroup questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="SINGLE_SELECT" title="Explanation" openConfig={openConfig}>
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
      <ConfigSheet
        open={isConfigOpen}
        onOpenChange={setIsConfigOpen}
        title="Single Select"
        description="Configure the selected question."
      >
        <SingleSelectConfig questionIndex={questionIndex} />
      </ConfigSheet>
    </div>
  );
}
