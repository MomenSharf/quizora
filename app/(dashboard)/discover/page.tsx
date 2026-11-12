import { CategorySlider } from "@/features/discover/components/category-slider";
import { mockQuizzes } from "@/features/discover/components/constants/discover.mock";
import { DiscoverHero } from "@/features/discover/components/discover-hero";
import { DiscoverSections } from "@/features/discover/components/discover-sections";

export default function DiscoverPage() {
  return (
    <main className="mx-auto w-full min-w-0 max-w-[1600px] space-y-8 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
      <DiscoverHero />

      <CategorySlider />
      

      <DiscoverSections  />

      {/* Popular quizzes section */}

      {/* Recommended quizzes section */}

      {/* Trending quizzes section */}
    </main>
  );
}
