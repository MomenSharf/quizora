import QuestionNavigation from "@/features/quiz-editor/components/questions-editor/questions-navigation";
import QuizNavigation from "@/features/quiz-editor/components/quiz-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return<div className="w-full h-full flex flex-col md:flex-row">
        <QuestionNavigation />
        <div className="flex-1 min-w-0 bg-muted/30">{children}</div>
      </div>;
}
