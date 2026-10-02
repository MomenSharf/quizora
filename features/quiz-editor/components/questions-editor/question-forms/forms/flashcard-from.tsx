import ExplanationSection from "../explanation-section";
import { FlashcardEditor } from "../flashcard/flashcard-editor";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function FlashcardForm({ questionIndex }: QuestionFormProps) {
  return (
    <div
      className="space-y-5"
      style={
        {
          "--primary": "var(--question-flashcard)",
        } as React.CSSProperties
      }
    >
      <SectionCard type="FLASHCARD" title="Flashcard">
        <QuestionSection questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="FLASHCARD" title="Edit Cards">
       <FlashcardEditor questionIndex={questionIndex} />
      </SectionCard>
      <SectionCard type="FLASHCARD" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
