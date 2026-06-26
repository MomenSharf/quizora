import Header from "@/features/quiz-editor/components/header";
import QuestionsEditorLayout from "@/features/quiz-editor/components/questions-editor/questions-editor-layout";
import QuizEditorNavigation from "@/features/quiz-editor/components/quiz-editor-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <QuestionsEditorLayout>{children}</QuestionsEditorLayout>;
}
