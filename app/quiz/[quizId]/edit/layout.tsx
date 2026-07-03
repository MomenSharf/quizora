import QuizHeader from "@/features/quiz-editor/components/quiz-header";
import QuizNavigation from "@/features/quiz-editor/components/quiz-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen grid grid-rows-[65px_1fr] ">
      <QuizHeader />

      <main className="h-[100vh-65px] grid grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-1 overflow-hidden ">
        <QuizNavigation />
        <div className="flex flex-1 min-w-0 bg-muted/30 dark:bg-muted/20 border-t sm:border rounded-t-lg md:rounded-tl-xl md:rounded-tr-none overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
}
