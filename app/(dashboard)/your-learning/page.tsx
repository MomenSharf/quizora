import { auth } from "@/features/auth/lib/auth-options";
import { redirect } from "next/navigation";

import { demoAttempts } from "@/lib/data/learning-demo-data";
import { LearningPage } from "@/components/collection/learning-page";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <LearningPage attempts={demoAttempts} />
    </div>
  );
}