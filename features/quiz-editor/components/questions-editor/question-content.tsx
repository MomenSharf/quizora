"use client";
import QuestionHeader from "./question-header";
import QestionTypeSelector from "./question-type-selector";

const QuestionrContent = () => {
  return (
    <div className="scrollbar-thin flex flex-col h-full overflow-y-auto">
      <QuestionHeader />
      <div className="flex flex-col gap-2 max-w-full p-2">
        <h1 className="text-lg font-semibold ">Select Question Type</h1>
        <QestionTypeSelector />
      </div>
    </div>
  );
};

export default QuestionrContent;
