import type { ReactNode } from "react";

import EditorHeader from "@/features/quiz-editor/components/editor-header";
import { QuizEditorProvider } from "@/features/quiz-editor/components/providers";
import { getQuiz } from "@/features/quiz-editor/actions/get-quiz";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    quizId: string;
  }>;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { quizId } = await params;

  const { quiz, editorState } = await getQuiz(quizId);

  return (
    <QuizEditorProvider initialData={quiz} initialState={editorState}>
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden md:grid md:grid-rows-[65px_1fr]">
          <EditorHeader />

          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-muted/30 scrollbar-thin dark:bg-muted/20">
            {children}
          </main>
        </div>
      </div>
    </QuizEditorProvider>
  );
}