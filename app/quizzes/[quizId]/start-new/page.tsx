import { notFound } from "next/navigation";

import prisma from "@/lib/db/prisma";
import StartNewPage from "@/features/quiz-runtime/components/start-new/start-attempt-page";

type PageProps = {
  params: Promise<{
    quizId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { quizId } = await params;

  const quiz = await prisma.quiz.findFirst({
    where: {
      id: quizId,
    },
    select: {
      id: true,
      title: true,
      questionCount: true,
      questions: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!quiz) {
    notFound();
  }

  return (
    <StartNewPage
      quizId={quiz.id}
      quizTitle={quiz.title}
      questionCount={quiz.questionCount}
    />
  );
}