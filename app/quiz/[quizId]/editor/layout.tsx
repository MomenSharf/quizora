import type { ReactNode } from "react";

import EditorHeader from "@/features/quiz-editor/components/editor-header";
import EditorNavigation from "@/features/quiz-editor/components/editor-navigation";
import { QuizEditorProvider } from "@/features/quiz-editor/components/providers";
import { getQuiz } from "@/features/quiz-editor/actions/get-quiz";
import { createDefaultQuiz } from "@/features/quiz-editor/create-defaults/quiz/create-default-quiz";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    quizId: string;
  }>;
};

export default  async function Layout({
  children,
  params,
}: LayoutProps) {
  const { quizId } = await params;

  const {quiz, editorState} = await getQuiz(quizId);

  return (
    <QuizEditorProvider initialData={quiz} initialState={editorState}>
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden md:grid md:grid-rows-[65px_1fr]">
          <EditorHeader />

          <div className="flex flex-1 flex-col overflow-hidden md:grid md:grid-cols-[auto_1fr]">
            <EditorNavigation />

            <div className="min-w-0 flex-1 overflow-y-auto md:overflow-hidden scrollbar-thin rounded-t-lg border bg-muted/30 dark:bg-muted/20 sm:rounded-t-xl md:rounded-tr-none md:rounded-tl-xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </QuizEditorProvider>
  );
}