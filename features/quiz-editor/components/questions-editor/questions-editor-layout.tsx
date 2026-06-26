import React from "react";
import QuestionEditorNavigation from "./questions-editor-navigation";
import QuestionEditorContent from "./question-editor-content";

const QuestionsEditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col sm:flex-row">
      <QuestionEditorNavigation />
      {children}
    </div>
  );
};

export default QuestionsEditorLayout;
