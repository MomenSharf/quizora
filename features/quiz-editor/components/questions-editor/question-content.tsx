"use client";
import { useSelectedQuestionId } from "../../store";
import { QuestionFormRouter } from "./question-forms/question-form-router";

const QuestionContent = () => {
  const questionId = useSelectedQuestionId();



  return (
    <div className="scrollbar-thin flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col gap-2 p-2">
        <QuestionFormRouter questionId={questionId ?? ""} />
      </div>
    </div>
  );
};

export default QuestionContent;
