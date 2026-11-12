"use client";

import { IconSparkles } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DiscoverHeroProps {
  onSearch?: (query: string) => void;
}

export function DiscoverHero({ onSearch }: DiscoverHeroProps) {
  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="grid min-h-[320px] items-center lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-start py-10 sm:py-12 lg:py-16"
        >
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-primary">
            <IconSparkles className="size-4" />
            Discover something new
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Explore more.
            <span className="text-primary"> Learn something new.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            Discover interesting quizzes, explore new topics, and challenge
            yourself with something different every day.
          </p>

                    <div className="mt-7 w-full max-w-xl">
              <form
                action="/discover/search"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto h-[240px] w-full max-w-lg sm:h-[300px] lg:h-[360px]"
        >
          <div className="absolute inset-10 rounded-full bg-primary/10 blur-3xl" />

          <Image
            src="/assets/images/discovery-hero.png"
            alt="Explore and discover new quizzes"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="z-10 object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
