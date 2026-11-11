import { IconBook2 } from "@tabler/icons-react";

import { QuizCard } from "./quiz-card";

import type { CollectionItem } from "@/types/collection";

type QuizGridProps = {
  items: CollectionItem[];
  emptyMessage?: string;
  emptyTitle?: string;
};

export function QuizGrid({
  items,
  emptyMessage = "Your quizzes will appear here.",
  emptyTitle = "No quizzes found",
}: QuizGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 px-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
          <IconBook2 className="size-6 text-muted-foreground" />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{emptyTitle}</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <QuizCard key={`${item.kind}-${item.id}`} item={item} />
      ))}
    </div>
  );
}