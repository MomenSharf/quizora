import { mockQuizDetails } from "@/features/discover/components/constants/quiz-details.mock";
import { QuizDetailsCard } from "@/features/discover/quiz-details/quiz-details-card";
import { QuizQuestionsSection } from "@/features/discover/quiz-details/quiz-questions-section";



interface QuizDetailsPageProps {
  params: Promise<{
    quizId: string;
  }>;
}

export default async function QuizDetailsPage({
  params,
}: QuizDetailsPageProps) {
  const { quizId } = await params;

  const quiz = mockQuizDetails;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 sm:px-6 lg:py-10">
      <QuizDetailsCard quiz={quiz} />

      <QuizQuestionsSection
        questions={quiz.questions}
        totalPoints={quiz.totalPoints}
      />
    </main>
  );
}
