import Header from "@/features/quiz-editor/components/header";
import QuizNavigation from "@/features/quiz-editor/components/quiz-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen grid grid-rows-[65px_1fr] ">
      <Header />

      <main className="h-[100vh-65px] grid grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] sm:grid-rows-1 overflow-hidden ">
        <QuizNavigation />
        <div className="flex flex-1 min-w-0 border-t sm:border rounded-t-lg overflow-hidden">{children}</div>
      </main>
    </div>
  );
}
