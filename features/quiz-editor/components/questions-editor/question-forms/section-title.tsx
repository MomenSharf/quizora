import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { QuestionTypeIcon } from "../question-type-selector/question-type-icon";

const SectionTitle = ({
  type,
  title,
}: {
  type: QuestionType;
  title: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <QuestionTypeIcon type={type} />
      <h3 className="font-medium">{title}</h3>
    </div>
  );
};

export default SectionTitle;
