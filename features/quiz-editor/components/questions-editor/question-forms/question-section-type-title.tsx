import { QUESTION_TYPE_LABELS } from "@/features/quiz-editor/constants/question-types";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { QuestionTypeIcon } from "../question-type-selector/question-type-icon";

const QuestionSectionTypeTitle = ({ type }: { type: QuestionType }) => {
  return (
    <div className="flex gap-2 items-center">
      <QuestionTypeIcon type={type} />
      <h3 className="font-medium">{QUESTION_TYPE_LABELS[type]}</h3>
    </div>
  );
};

export default QuestionSectionTypeTitle;
