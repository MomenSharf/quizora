
import { IconSearch } from "@tabler/icons-react";

import type { DiscoverQuiz } from "@/features/discover/constants/discover.select";
import { QuizListCard } from "@/features/discover/components/quiz-list-card";

type QuizSearchResultsProps = {
  quizzes: DiscoverQuiz[];
  total: number;
  query?: string;
};

export function QuizSearchResults({
  quizzes,
  total,
  query,
}: QuizSearchResultsProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-base font-semibold tracking-tight">
          {query ? `Results for "${query}"` : "Explore quizzes"}
        </h2>

        <p className="text-sm text-muted-foreground">
          {total.toLocaleString()} {total === 1 ? "quiz" : "quizzes"} found
        </p>
      </div>

      {quizzes.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted">
            <IconSearch className="size-6 text-muted-foreground" />
          </div>

          <h3 className="text-base font-semibold">No quizzes found</h3>

          <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {query
              ? `We couldn't find any quizzes matching "${query}". Try another search or adjust your filters.`
              : "Try changing your filters to discover more quizzes."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <QuizListCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </section>
  );
}
