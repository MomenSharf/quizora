import QuestionEditorContentHeader from "./uestion-editor-content-header";

const QuestionEditorContent = () => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col">
      <QuestionEditorContentHeader />
    </div>
  );
};

export default QuestionEditorContent;
