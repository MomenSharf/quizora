'use client'
import RichTextEditor from "@/components/rich-text-editor";
import QuestionEditorContentHeader from "./uestion-editor-content-header";

const QuestionEditorContent = () => {
  return (
    <div className="scrollbar-thin flex flex-col h-full overflow-y-auto">
      <QuestionEditorContentHeader />
      <div className="flex flex-col gap-2 m-10 mt-10 max-w-full">
       
       <RichTextEditor content="Hello World" onChange={() => {}} placeholder="Start typing..." />
      </div>
    </div>
  );
};

export default QuestionEditorContent;
