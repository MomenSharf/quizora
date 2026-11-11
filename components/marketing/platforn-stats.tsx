
import {
  Users,
  BookOpen,
  MessageCircleQuestion,
  Trophy,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    label: "Awesome learners",
    value: "1,200+",
    description: "People learning and growing together.",
    icon: Users,
    className: "sm:col-span-2 sm:row-span-1",
    iconClassName: "bg-violet-500/10 text-violet-500",
    background: "bg-violet-500/[0.04]",
  },
  {
    label: "Quizzes to explore",
    value: "850+",
    description: "Something new to discover every day.",
    icon: BookOpen,
    className: "sm:col-span-1 sm:row-span-2",
    iconClassName: "bg-sky-500/10 text-sky-500",
    background: "bg-sky-500/[0.04]",
  },
  {
    label: "Questions answered",
    value: "24K+",
    description: "Every question makes you smarter.",
    icon: MessageCircleQuestion,
    className: "sm:col-span-1 sm:row-span-1",
    iconClassName: "bg-amber-500/10 text-amber-500",
    background: "bg-amber-500/[0.04]",
  },
  {
    label: "Quiz challenges",
    value: "5K+",
    description: "And so many more to come!",
    icon: Trophy,
    className: "sm:col-span-2 sm:row-span-1",
    iconClassName: "bg-emerald-500/10 text-emerald-500",
    background: "bg-emerald-500/[0.04]",
  },
];

export function PlatfromStats() {
  return (
   <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
  <div className="mb-8">
    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
      <Sparkles className="size-4" />
      A little about Quizora
    </div>

    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
      Learning, but make it <span className="text-primary">fun!</span>
    </h2>

    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
      Good things happen when curiosity meets a little challenge.
      Here&apos;s what our Quizora community is all about.
    </p>
  </div>

<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  {stats.map((stat) => {
    const Icon = stat.icon;

    return (
      <div
        key={stat.label}
        className={`group flex min-h-44 flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 ${stat.background}`}
      >
        <div className="flex items-center justify-between">
          <div className={`flex size-11 items-center justify-center rounded-2xl ${stat.iconClassName}`}>
            <Icon className="size-5" />
          </div>
        </div>

        <div>
          <p className="text-3xl font-bold tracking-tight sm:text-4xl">
            {stat.value}
          </p>
          <p className="mt-1 font-medium">{stat.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {stat.description}
          </p>
        </div>
      </div>
    );
  })}
</div>
</section>
  );
}
