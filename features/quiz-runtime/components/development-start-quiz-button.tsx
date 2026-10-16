"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FlaskConical, LoaderCircle } from "lucide-react";
import { createDevelopmentQuiz } from "../actions/create-development-quiz.action";


export function DevelopmentStartQuizButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAndStart = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await createDevelopmentQuiz();

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      toast.success(result.data.message);
      router.push(`/quizzes/${result.data.quizId}/start-new`);
    } catch {
      toast.error("Something went wrong while creating the quiz.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCreateAndStart}
      disabled={isLoading}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:text-amber-300"
    >
      {isLoading ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <FlaskConical className="size-4" />
      )}

      {isLoading ? "Creating quiz..." : "Dev: Create & Start Quiz"}
    </button>
  );
}