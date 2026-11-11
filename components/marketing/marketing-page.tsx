import { Footer } from "@/components/layout/footer";
import { HeroSection } from "./hero-section";
import { PaltformFeatures } from "./platforn-features";
import { PlatfromStats } from "./platforn-stats";
import { Reveal } from "./reveal";

type MarketingPageProps = {
  isAuthenticated: boolean;
  userName?: string;
};

export function MarketingPage({
  isAuthenticated,
  userName,
}: MarketingPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeroSection
        isAuthenticated={isAuthenticated}
        userName={userName}
      />

      <Reveal>
        <PlatfromStats />
      </Reveal>

      <Reveal delay={0.1}>
        <PaltformFeatures />
      </Reveal>

      <Reveal delay={0.1} y={12}>
        <Footer />
      </Reveal>
    </main>
  );
}