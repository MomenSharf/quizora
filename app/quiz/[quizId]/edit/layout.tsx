import Header from "@/features/quiz-editor/components/header";
import QuizEditorNavigation from "@/features/quiz-editor/components/quiz-editor-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="h-screen grid grid-rows-[auto_auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr]">
<div className="h-screen grid grid-rows-[65px_1fr] ">
 <Header />

  <main className="h-[100vh-65px] flex flex-col sm:flex-row sm:overflow-hidden">
     <aside className="border-b sm:border-r">
        <QuizEditorNavigation />
      </aside>
      {children}
  </main>
</div>
  );
}

