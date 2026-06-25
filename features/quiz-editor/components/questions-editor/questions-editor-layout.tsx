import React from "react";
import QuestionEditorNavigation from "./questions-editor-navigation";
import QuestionEditorContent from "./question-editor-content";

const QuestionsEditorLayout = () => {
  return (
    <div className="w-full h-full flex flex-col sm:flex-row">
      <QuestionEditorNavigation />
      <QuestionEditorContent />
    </div>
  );
};

export default QuestionsEditorLayout;
