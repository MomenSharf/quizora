import React from "react";
import QuestionContent from "./question-content";
import QuestionSelector from "./question-selector";

const QuestionLayout = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row p-1.5">
      {/* <div className=""> */}
        <QuestionSelector />
      {/* </div> */}
      <div className="flex-1 min-w-0">
        <QuestionContent />
      </div>
    </div>
  );
};

export default QuestionLayout;
