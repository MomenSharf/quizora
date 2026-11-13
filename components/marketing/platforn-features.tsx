import { appConfig } from "@/lib/config/app";
import {
  Sparkles,
  PencilRuler,
  Gamepad2,
  ChartNoAxesCombined,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "../shared/section-heading";

const features = [
  {
    number: "01",
    label: "CREATE",
    title: "Bring your ideas to life.",
    description:
      "Create engaging quizzes with different question types, custom content, and an easy-to-use editor.",
    icon: PencilRuler,
    theme: "bg-violet-50 dark:bg-violet-950/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    headingColor: "text-violet-950 dark:text-violet-100",
    descriptionColor: "text-violet-800/75 dark:text-violet-200/70",
    decoration: "bg-violet-300/20",
  },
  {
    number: "02",
    label: "PLAY",
    title: "Make learning an adventure.",
    description:
      "Enjoy interactive questions, test your knowledge, and make every quiz a fun experience.",
    icon: Gamepad2,
    theme: "bg-sky-50 dark:bg-sky-950/30",
    iconColor: "text-sky-600 dark:text-sky-400",
    headingColor: "text-sky-950 dark:text-sky-100",
    descriptionColor: "text-sky-800/75 dark:text-sky-200/70",
    decoration: "bg-sky-300/20",
  },
  {
    number: "03",
    label: "GROW",
    title: "See your progress unfold.",
    description:
      "Review your results, learn from your mistakes, and celebrate every step forward.",
    icon: ChartNoAxesCombined,
    theme: "bg-orange-50 dark:bg-orange-950/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    headingColor: "text-orange-950 dark:text-orange-100",
    descriptionColor: "text-orange-800/75 dark:text-orange-200/70",
    decoration: "bg-orange-300/20",
  },
  {
    number: "04",
    label: "DISCOVER",
    title: "Find something new every day.",
    description:
      "Explore quizzes across different topics, discover new interests, and share your creations.",
    icon: Compass,
    theme: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    headingColor: "text-emerald-950 dark:text-emerald-100",
    descriptionColor: "text-emerald-800/75 dark:text-emerald-200/70",
    decoration: "bg-emerald-300/20",
  },
];

export function PaltformFeatures() {
  return (
    <section className="w-full min-w-0 py-8 sm:py-10">
      <SectionHeading
        className="mb-8"
        eyebrow={`Discover ${appConfig.name}`}
        title="Everything you need to make learning fun."
        description="Create, play, and explore. Discover a better way to challenge yourself and learn something new every day."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.number}
              className={`group relative isolate flex min-h-48 flex-col justify-between overflow-hidden rounded-2xl border border-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:min-h-52 sm:p-6 ${feature.theme}`}
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 -z-10 size-36 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125 ${feature.decoration}`}
              />

              <div className="flex items-center justify-between">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl bg-white/80 shadow-sm dark:bg-white/10 ${feature.iconColor}`}
                >
                  <Icon className="size-5" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wider text-muted-foreground/70">
                    {feature.number}
                  </span>
                </div>
              </div>

              <div className="relative mt-8 max-w-md">
                <p
                  className={`mb-1.5 text-[11px] font-bold tracking-[0.16em] ${feature.iconColor}`}
                >
                  {feature.label}
                </p>

                <h3
                  className={`text-lg font-bold tracking-tight sm:text-xl ${feature.headingColor}`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`mt-2 text-sm leading-6 ${feature.descriptionColor}`}
                >
                  {feature.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
