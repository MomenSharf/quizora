import EditorHeader from "@/features/quiz-editor/components/editor-header";
import EditorNavigation from "@/features/quiz-editor/components/editor-navigation";
import { QuizEditorProvider } from "@/features/quiz-editor/components/providers";
import { createDefaultQuiz } from "@/features/quiz-editor/create-defaults/quiz/create-default-quiz";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QuizEditorProvider initialData={createDefaultQuiz()}>
      <div className="h-screen grid grid-rows-[65px_1fr] ">
        <EditorHeader />

        <main className="h-[100vh-65px] grid grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-1 overflow-hidden ">
          <EditorNavigation />
          <div className="flex flex-1 min-w-0 bg-muted/30 dark:bg-muted/20 border-t sm:border rounded-t-lg md:rounded-tl-xl md:rounded-tr-none overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </QuizEditorProvider>
  );
}
