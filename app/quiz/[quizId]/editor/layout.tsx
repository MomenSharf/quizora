import EditorHeader from "@/features/quiz-editor/components/editor-header";
import EditorNavigation from "@/features/quiz-editor/components/editor-navigation";
import { QuizEditorProvider } from "@/features/quiz-editor/components/providers";
import { createDefaultQuiz } from "@/features/quiz-editor/create-defaults/quiz/create-default-quiz";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QuizEditorProvider initialData={createDefaultQuiz()}>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex flex-col md:grid md:grid-rows-[65px_1fr] flex-1 overflow-hidden">
          <EditorHeader />

          <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] overflow-hidden flex-1">
            <EditorNavigation />

            <div className="flex min-w-0 flex-1 bg-muted/30 dark:bg-muted/20 border-t sm:border rounded-t-lg md:rounded-tl-xl md:rounded-tr-none overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </QuizEditorProvider>
  );
}