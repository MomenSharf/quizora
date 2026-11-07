import { notFound } from "next/navigation";

import Gameplay from "@/features/quiz-runtime/components/game-play";
import { getAttempt } from "@/features/quiz-runtime/actions/get-attempt";
import { saveAttempt } from "@/features/quiz-runtime/actions/save-attempt";

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

  const result = await getAttempt({ attemptId });

  if (result.error) {
    notFound();
  }

  const { runttimeAttempt } = result.data;
  console.log(runttimeAttempt.startedAt);
  

  return <Gameplay attempt={runttimeAttempt}  />;
}
