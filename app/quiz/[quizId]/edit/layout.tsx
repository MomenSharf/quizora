import Header from "@/features/quiz-editor/header";
import QuizEditorNavigation from "@/features/quiz-editor/quiz-editor-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr]">
      <Header />

      <aside className="border-b sm:border-r">
        <QuizEditorNavigation />
      </aside>

      <main className="overflow-y-auto p-6">{children}</main>
    </div>
  );
}
