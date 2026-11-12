"use client";

import { useMemo } from "react";

import { CollectionPage } from "@/components/collection/collection-page";
import { QuizGrid } from "./quiz-grid";
import { QuizTable } from "./quiz-table";

import { mapAttemptToCollectionItem } from "@/lib/mappers/collection.mapper";
import { QuizAttemptLibraryItem } from "@/lib/services/quiz-service";
import { IconBook } from "@tabler/icons-react";

type LearningPageProps = {
  attempts: QuizAttemptLibraryItem[];
};

type LearningFilters = {
  activeTab: string;
  search: string;
  sort: string;
};

const sortOptions = [
  { label: "Recently active", value: "updated" },
  { label: "Recently started", value: "created" },
  { label: "Alphabetical", value: "title" },
];

function getFilteredAttempts(
  attempts: QuizAttemptLibraryItem[],
  { activeTab, search, sort }: LearningFilters,
) {
  const normalizedSearch = search.trim().toLowerCase();

  return attempts
    .filter((attempt) => {
      switch (activeTab) {
        case "in-progress":
          return !["COMPLETED", "ABANDONED", "EXPIRED"].includes(
            attempt.status,
          );

        case "completed":
          return attempt.status === "COMPLETED";

        default:
          return true;
      }
    })
    .filter((attempt) => {
      if (!normalizedSearch) return true;

      const quiz = attempt.quiz;

      const searchableContent = [
        quiz.title,
        quiz.description,
        quiz.category,
        quiz.language,
        ...quiz.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(normalizedSearch);
    })
    .sort((a, b) => {
      switch (sort) {
        case "created":
          return b.createdAt.getTime() - a.createdAt.getTime();

        case "title":
          return a.quiz.title.localeCompare(b.quiz.title);

        case "updated":
        default:
          return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
    });
}

function LearningEmptyState({
  activeTab,
  search,
}: {
  activeTab: string;
  search: string;
}) {
  const hasSearch = search.trim().length > 0;

  const content = hasSearch
    ? {
        title: "No matching quizzes",
        description:
          "We couldn't find any learning activity matching your search. Try another keyword.",
      }
    : activeTab === "in-progress"
      ? {
          title: "Nothing in progress",
          description:
            "Quizzes you start will appear here while you're working on them.",
        }
      : activeTab === "completed"
        ? {
            title: "No completed quizzes yet",
            description: "Your completed quizzes will appear here.",
          }
        : {
            title: "Your learning journey starts here",
            description: "Explore quizzes and start learning at your own pace.",
          };

  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border bg-muted/50">
        <IconBook className="size-5 text-muted-foreground" />
      </div>

      <h3 className="text-sm font-semibold">{content.title}</h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {content.description}
      </p>
    </div>
  );
}

export function LearningPage({ attempts }: LearningPageProps) {
  const tabs = useMemo(
    () => [
      {
        value: "all",
        label: "All",
        count: attempts.length,
      },
      {
        value: "in-progress",
        label: "In Progress",
        count: attempts.filter(
          (attempt) =>
            !["COMPLETED", "ABANDONED", "EXPIRED"].includes(attempt.status),
        ).length,
      },
      {
        value: "completed",
        label: "Completed",
        count: attempts.filter((attempt) => attempt.status === "COMPLETED")
          .length,
      },
    ],
    [attempts],
  );

  return (
    <CollectionPage
      title="My Learning"
      tabs={tabs}
      sortOptions={sortOptions}
      defaultTab="all"
      defaultSort="updated"
      defaultView="grid"
      showCreateButton={false}
    >
      {({ activeTab, search, view, sort }) => {
        const filteredAttempts = getFilteredAttempts(attempts, {
          activeTab,
          search,
          sort,
        });

        if (filteredAttempts.length === 0) {
          return <LearningEmptyState activeTab={activeTab} search={search} />;
        }

        const items = filteredAttempts.map(mapAttemptToCollectionItem);

        return view === "grid" ? (
          <QuizGrid items={items} emptyTitle="No learning activity" />
        ) : (
          <QuizTable items={items} />
        );
      }}
    </CollectionPage>
  );
}
