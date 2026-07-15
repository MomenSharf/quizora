"use client";
import { useSelectedQuestion } from "../../hooks/use-selected-question";
import { useSelectedQuestionId } from "../../store";
import { QuestionFormRouter } from "./question-forms/question-form-router";

const QuestionContent = () => {
  const {question, questionIndex} = useSelectedQuestion();



  return (
    <div className="scrollbar-thin flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col gap-2 p-2">
        <QuestionFormRouter />
      </div>
    </div>
  );
};

export default QuestionContent;
