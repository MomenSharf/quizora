import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeroSectionProps = {
  isAuthenticated: boolean;
  userName?: string;
};

export function HeroSection({ isAuthenticated, userName }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="grid items-center gap-6 px-6 py-10 sm:px-10 sm:py-12 lg:min-h-[390px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:px-12">
        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            {isAuthenticated ? "Welcome back!" : "Learn · Play · Grow"}
          </div>

          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {isAuthenticated ? (
              <>
                Ready for your{" "}
                <span className="text-primary">next challenge?</span>
              </>
            ) : (
              <>
                Turn curiosity into a{" "}
                <span className="text-primary">challenge.</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            {isAuthenticated
              ? `✨ Welcome back${userName ? `, ${userName}` : ""}! Discover new quizzes, challenge yourself, and keep learning.`
              : "🚀 Create interactive quizzes, challenge yourself, and make every question count. Learning has never been this fun."}
          </p>

          {isAuthenticated ? (
            <div className="mt-7 w-full max-w-xl">
              <form
                action="/discover"
                method="GET"
                className="flex h-12 w-full items-center gap-3 rounded-xl border bg-background px-4 shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
              >
                <Search className="size-4 shrink-0 text-muted-foreground" />

                <Input
                  name="q"
                  placeholder="Search quizzes by title, topic, or subject..."
                  className="h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
                />

                <Button
                  type="submit"
                  size="sm"
                  className="h-8 shrink-0 rounded-lg px-4"
                >
                  Search
                </Button>
              </form>
            </div>
          ) : (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Get Started Free
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/discover">Discover Quizzes</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Illustration */}
        <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
          <Image
            src="/assets/images/quizora-hero.png"
            alt="Interactive Quizora quiz illustration"
            width={700}
            height={580}
            priority
            className="relative z-10 mx-auto h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
