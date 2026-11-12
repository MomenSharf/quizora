import { CategorySlider } from "@/features/discover/components/category-slider";
import { DiscoverHero } from "@/features/discover/components/discover-hero";

export default function DiscoverPage() {
  return (
    <main className="mx-auto w-full min-w-0 max-w-[1600px] space-y-8 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
      <DiscoverHero />

      <CategorySlider />

      {/* Popular quizzes section */}

      {/* Recommended quizzes section */}

      {/* Trending quizzes section */}
    </main>
  );
}
