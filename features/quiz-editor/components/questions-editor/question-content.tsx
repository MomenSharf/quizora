"use client";
import QuestionHeader from "./question-header";
import QuestionTypeSelector from "./question-type-selector";

const QuestionrContent = () => {
  return (
    <div className="scrollbar-thin flex flex-col h-full overflow-y-auto">
      {/* <QuestionHeader /> */}
      <div className="flex flex-col gap-2 p-2">
        <QuestionTypeSelector />
      </div>
    </div>
  );
};

export default QuestionrContent;
