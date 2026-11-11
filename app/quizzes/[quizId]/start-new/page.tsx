import { notFound } from "next/navigation";

import StartNewPage from "@/features/quiz-runtime/components/start-new/start-attempt-page";
import prisma from "@/lib/db/prisma";
import { RuntimeEnvironment } from "@/features/quiz-runtime/types/runtime-types";

type PageProps = {
  params: Promise<{
    quizId: string;
  }>;
  searchParams: Promise<{
    environment?: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { quizId } = await params;

  const query = await searchParams;

  const environment: RuntimeEnvironment =
    query.environment === "PREVIEW" ? "PREVIEW" : "PRODUCTION";

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
      environment={environment}
    />
  );
}
