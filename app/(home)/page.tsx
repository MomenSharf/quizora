import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/marketing/hero-section";
import { PaltformFeatures } from "@/components/marketing/platforn-features";
import { PlatfromStats } from "@/components/marketing/platforn-stats";
import { auth } from "@/features/auth/lib/auth-options";

export default async function Home() {
  const session = await auth();
  return (
    <main className="bg-gradient-to-br from-primary/[0.06] via-background to-violet-500/[0.08]">
      <HeroSection
        isAuthenticated={!!session?.user}
        userName={session?.user?.name ?? undefined}
      />
      <PlatfromStats />
      <PaltformFeatures />
      <Footer />
    </main>
  );
}
