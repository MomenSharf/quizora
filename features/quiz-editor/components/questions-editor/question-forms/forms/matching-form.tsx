"use client";

import ExplanationSection from "../explanation-section";
import { MatchPairsGroup } from "../pairs/match-pairs-group";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function MatchingForm({ questionIndex }: QuestionFormProps) {
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": 'var(--question-match)',
        } as React.CSSProperties
      }
    >
      <SectionCard type="MATCH" title="Question">
        <QuestionSection questionIndex={questionIndex} type="MATCH" />
      </SectionCard>

      <SectionCard type="MATCH" title="Match Pairs">
        <MatchPairsGroup questionIndex={questionIndex} />
      </SectionCard>

      <SectionCard type="MATCH" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}