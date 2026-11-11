import { notFound } from "next/navigation";

import Gameplay from "@/features/quiz-runtime/components/game-play";
import { getAttempt } from "@/features/quiz-runtime/actions/get-attempt";

type PageProps = {
  params: Promise<{ attemptId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { attemptId } = await params;

  if (!attemptId) {
    notFound();
  }

  const result = await getAttempt({ attemptId });

  if (result.error) {
    notFound();
  }

  const { runtimeAttempt } = result.data;

  return <Gameplay attempt={runtimeAttempt} />;
}
