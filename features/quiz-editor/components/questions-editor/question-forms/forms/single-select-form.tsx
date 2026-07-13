import { Badge } from "@/components/ui/badge";
import QuestionSectionTypeTitle from "../question-section-type-title";
import { SectionCard } from "../section-card";
import QuestionSection from "../question-section";

interface Props {
  questionId: string;
}

export function SingleSelectForm({ questionId }: Props) {
  return (
    <SectionCard
      title={<QuestionSectionTypeTitle type="SINGLE_SELECT" />}
    >
      <QuestionSection questionId={questionId} />
    </SectionCard>
  );
}
