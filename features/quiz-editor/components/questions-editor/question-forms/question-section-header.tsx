import { Button } from "@/components/ui/button";
import { QUESTION_TYPE_LABELS } from "@/features/quiz-editor/constants/question-types";
import { Question } from "@/features/quiz-editor/validation/question";
import { IconSettings2 } from "@tabler/icons-react";
import { QuestionTypeIcon } from "../question-type-selector/question-type-icon";

const QuestionSectionHeader = ({question }: { question: Question }) => {
  return <div className="px-5 py-3 border-b flex justify-between items-center">
    <div className="flex gap-2 items-center">
      <QuestionTypeIcon type={question.type} />
      <h3 className="font-medium">{QUESTION_TYPE_LABELS[question.type]}</h3>
    </div>
      <Button variant="ghost" size="icon">
        <IconSettings2 />
      </Button>
  </div>;
};

export default QuestionSectionHeader;
