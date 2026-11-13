import { appConfig } from "@/lib/config/app";
import {
  Users,
  BookOpen,
  MessageCircleQuestion,
  Trophy,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "../shared/section-heading";

const stats = [
  {
    label: "Awesome learners",
    value: "1,200+",
    description: "People learning and growing together.",
    icon: Users,
  },
  {
    label: "Quizzes to explore",
    value: "850+",
    description: "Something new to discover every day.",
    icon: BookOpen,
  },
  {
    label: "Questions answered",
    value: "24K+",
    description: "Every question makes you smarter.",
    icon: MessageCircleQuestion,
  },
  {
    label: "Quiz challenges",
    value: "5K+",
    description: "And so many more to come!",
    icon: Trophy,
  },
];

export function PlatfromStats() {
  return (
    <section className="w-full py-16">
      <SectionHeading
        className="mb-8"
        eyebrow={`The ${appConfig.name} experience`}
        title="Learning, but make it fun!"
        description="Good things happen when curiosity meets a little challenge. Here's what makes learning with Quizora special."
      />

      <div className="relative overflow-hidden rounded-[2rem] border bg-muted/30 p-6 sm:p-10 lg:p-12">
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Featured statistic */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="size-6" />
              </div>

              <p className="text-sm font-medium text-muted-foreground">
                Awesome learners
              </p>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-6xl font-bold tracking-[-0.06em] sm:text-7xl">
                  1.2K
                </span>
                <span className="text-2xl font-semibold text-primary">+</span>
              </div>

              <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                People learning and growing together, one quiz at a time.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4 text-primary" />
              Making every learning moment count.
            </div>
          </div>

          {/* Supporting statistics */}
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {stats.slice(1).map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group flex flex-col justify-between border-t border-border/70 py-7 sm:py-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </span>
                    <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>

                  <div className="mt-5">
                    <div className="text-4xl font-bold tracking-tight">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-5">
          <span className="text-xs font-medium text-muted-foreground">
            Learn. Play. Achieve.
          </span>
          {/* <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            Discover more
            <ArrowUpRight className="size-3.5" />
          </span> */}
        </div>
      </div>
    </section>
  );
}