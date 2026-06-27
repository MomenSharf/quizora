import React from "react";
import QuestionEditorNavigation from "./questions-editor-navigation";

const QuestionsEditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col sm:flex-row">
      <QuestionEditorNavigation />
      <div className="bg-secondary-background w-full">{children}</div>
    </div>
  );
};

export default QuestionsEditorLayout;
