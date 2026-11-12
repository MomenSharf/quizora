
import { Suspense } from "react";

import { QuizSearchFilters } from "@/features/discover/components/search/quiz-search-filters";
import { QuizSearchResults } from "@/features/discover/components/search/quiz-search-results";
import { MOCK_SEARCH_QUIZZES } from "../constants/mock-search-quizzes";



export default function QuizSearchPage() {
  return (
    <main className="w-full min-w-0">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Suspense fallback={<div className="h-20" />}>
            <QuizSearchFilters />
          </Suspense>

          <QuizSearchResults
            quizzes={MOCK_SEARCH_QUIZZES}
            total={MOCK_SEARCH_QUIZZES.length}
          />
        </div>
      </div>
    </main>
  );
}
