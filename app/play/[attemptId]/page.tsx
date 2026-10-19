import { notFound } from "next/navigation";

import Gameplay from "@/features/quiz-runtime/components/game-play";
import { getAttempt } from "@/features/quiz-runtime/actions/get-attempt";

type PageProps = {
  params: Promise<{ attemptId: string }>;
  searchParams: Promise<{ environment?: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { attemptId } = await params;
  const { environment } = await searchParams;

  if (!attemptId) {
    notFound();
  }

  const { data: attempt, error } = await getAttempt({ attemptId });

  if (error || !attempt) {
    notFound();
  }

  return <Gameplay attempt={attempt} />;
}