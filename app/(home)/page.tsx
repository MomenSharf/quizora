import { auth } from "@/features/auth/lib/auth-options";
import { MarketingPage } from "@/components/marketing/marketing-page";

export default async function Home() {
  const session = await auth();

  return (
    <MarketingPage
      isAuthenticated={!!session?.user}
      userName={session?.user?.name ?? undefined}
    />
  );
}