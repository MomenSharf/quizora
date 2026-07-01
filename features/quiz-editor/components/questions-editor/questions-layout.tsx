import React from "react";
import QuestionNavigation from "./questions-navigation";

const QuestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col sm:flex-row">
      <QuestionNavigation />
      <div className="bg-secondary-background w-full">{children}</div>
    </div>
  );
};

export default QuestionsLayout;
