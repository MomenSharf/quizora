"use client";

import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import ExplanationSection from "../explanation-section";
import { MatchPairsGroup } from "../match-pairs-group";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function MatchingForm({ questionIndex }: QuestionFormProps) {
  const color = QUESTION_TYPE_COLORS.MATCH;
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": `${color}`,
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