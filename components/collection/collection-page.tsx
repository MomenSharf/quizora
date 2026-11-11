"use client";

import { useEffect, useState } from "react";

import CreateNewButton from "@/components/layout/create-new-button";
import { CollectionPageTabs } from "./collection-page-tabs";
import { CollectionToolbar } from "./collection-toolbar";

export type CollectionTab = {
  value: string;
  label: string;
  count?: number;
};

export type CollectionView = "grid" | "table";

export type CollectionSortOption = {
  label: string;
  value: string;
};

export type CollectionPageState = {
  activeTab: string;
  search: string;
  view: CollectionView;
  sort: string;
};

type CollectionPageProps = {
  title: string;
  tabs?: CollectionTab[];
  searchPlaceholder?: string;
  sortOptions?: CollectionSortOption[];
  headerAction?: React.ReactNode;
  showToolbar?: boolean;
  showTabs?: boolean;
  defaultTab?: string;
  defaultSort?: string;
  defaultView?: CollectionView;
  children: (state: CollectionPageState) => React.ReactNode;
  showCreateButton: boolean;
};

const defaultSortOptions: CollectionSortOption[] = [
  { label: "Recently updated", value: "updated" },
  { label: "Recently created", value: "created" },
  { label: "Alphabetical", value: "title" },
];

export function CollectionPage({
  title,
  tabs = [],
  searchPlaceholder = "Search...",
  sortOptions = defaultSortOptions,
  headerAction,
  showToolbar = true,
  showTabs = true,
  defaultTab,
  defaultSort = "updated",
  defaultView = "grid",
  children,
  showCreateButton,
}: CollectionPageProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab ?? tabs[0]?.value ?? "",
  );
  const [search, setSearch] = useState("");
  const [view, setView] = useState<CollectionView>(defaultView);
  const [sort, setSort] = useState(defaultSort);

  useEffect(() => {
    if (!tabs.length) {
      // !!
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab("");
      return;
    }

    if (!tabs.some((tab) => tab.value === activeTab)) {
      setActiveTab(tabs[0].value);
    }
  }, [tabs, activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {headerAction !== undefined
          ? headerAction
          : showCreateButton && (
              <div className="w-32 shrink-0 sm:w-36">
                <CreateNewButton isAuthenticated />
              </div>
            )}
      </div>

      {showTabs && tabs.length > 0 && (
        <CollectionPageTabs
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        />
      )}

      {showToolbar && (
        <CollectionToolbar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={searchPlaceholder}
          sortOptions={sortOptions}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
        />
      )}

      {children({
        activeTab,
        search,
        view,
        sort,
      })}
    </div>
  );
}
