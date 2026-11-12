import { DISCOVER_SORT_SECTIONS } from "./constants/discover-sections";
import { mockDiscoverCollections } from "./constants/discover.mock";
import { DiscoverQuizSlider } from "./discover-quiz-slider";

export function DiscoverSections() {
  return (
    <div className="space-y-8">
      {DISCOVER_SORT_SECTIONS.map((section) => (
        <DiscoverQuizSlider
          key={section.sort}
          {...section}
          quizzes={mockDiscoverCollections[section.sort]}
        />
      ))}
    </div>
  );
}