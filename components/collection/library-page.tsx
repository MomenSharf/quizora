"use client";

import { useMemo } from "react";
import { IconBook2 } from "@tabler/icons-react";

import { CollectionPage } from "@/components/collection/collection-page";
import { QuizGrid } from "./quiz-grid";
import { QuizTable } from "./quiz-table";

import type { QuizLibraryItem } from "@/lib/services/quiz-library.service";
import { mapQuizToCollectionItem } from "@/lib/mappers/collection.mapper";

type LibraryPageProps = {
  quizzes: QuizLibraryItem[];
};

type LibraryFilters = {
  activeTab: string;
  search: string;
  sort: string;
};

const sortOptions = [
  { label: "Recently updated", value: "updated" },
  { label: "Recently created", value: "created" },
  { label: "Alphabetical", value: "title" },
];

function getFilteredQuizzes(
  quizzes: QuizLibraryItem[],
  { activeTab, search, sort }: LibraryFilters,
) {
  const normalizedSearch = search.trim().toLowerCase();

  return quizzes
    .filter((quiz) => {
      switch (activeTab) {
        case "created":
          return quiz.publishedAt !== null;

        case "drafts":
          return quiz.publishedAt === null;

        default:
          return true;
      }
    })
    .filter((quiz) => {
      if (!normalizedSearch) return true;

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
          return a.title.localeCompare(b.title);

        case "updated":
        default:
          return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
    });
}

function LibraryEmptyState({
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
          "We couldn't find any quizzes matching your search. Try another keyword.",
      }
    : activeTab === "drafts"
      ? {
          title: "No drafts yet",
          description: "Quizzes you're still working on will appear here.",
        }
      : {
          title: "No quizzes yet",
          description:
            "Start creating quizzes and they will appear in your library.",
        };

  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border bg-muted/50">
        <IconBook2 className="size-5 text-muted-foreground" />
      </div>

      <h3 className="text-sm font-semibold">{content.title}</h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {content.description}
      </p>
    </div>
  );
}

export function LibraryPage({ quizzes }: LibraryPageProps) {
  const tabs = useMemo(
    () => [
      {
        value: "created",
        label: "Created",
        count: quizzes.filter((quiz) => quiz.publishedAt !== null).length,
      },
      {
        value: "drafts",
        label: "Drafts",
        count: quizzes.filter((quiz) => quiz.publishedAt === null).length,
      },
    ],
    [quizzes],
  );

  return (
    <CollectionPage
      title="Quiz Library"
      tabs={tabs}
      sortOptions={sortOptions}
      defaultTab="created"
      defaultSort="updated"
      defaultView="grid"
      showCreateButton
    >
      {({ activeTab, search, view, sort }) => {
        const filteredQuizzes = getFilteredQuizzes(quizzes, {
          activeTab,
          search,
          sort,
        });

        if (filteredQuizzes.length === 0) {
          return <LibraryEmptyState activeTab={activeTab} search={search} />;
        }

        const items = filteredQuizzes.map(mapQuizToCollectionItem);

        return view === "grid" ? (
          <QuizGrid items={items} />
        ) : (
          <QuizTable items={items} />
        );
      }}
    </CollectionPage>
  );
}
