"use client";

import {
  IconArrowsSort,
  IconLayoutGrid,
  IconList,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = {
  label: string;
  value: string;
};

type CollectionToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  sortOptions?: SortOption[];
  sort?: string;
  onSortChange?: (value: string) => void;
  view: "grid" | "table";
  onViewChange: (view: "grid" | "table") => void;
  className?: string;
};

export function CollectionToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  sortOptions = [],
  sort,
  onSortChange,
  view,
  onViewChange,
  className,
}: CollectionToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="relative w-full sm:max-w-xs">
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 rounded-xl border-border/70 bg-background pl-9 pr-9 shadow-none transition-colors focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/10"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconX className="size-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {sortOptions.length > 0 && (
          <div className="flex items-center gap-2">
            <IconArrowsSort className="size-4 shrink-0 text-muted-foreground" />

            <Select
              value={sort ?? sortOptions[0].value}
              onValueChange={onSortChange}
            >
              <SelectTrigger
                aria-label="Sort items"
                className="h-9 w-auto min-w-36 gap-2 border-0 bg-transparent px-2 shadow-none hover:bg-muted/50 focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>

              <SelectContent align="end">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex shrink-0 items-center gap-0.5 rounded-xl border border-border/70 bg-muted/40 p-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            className={cn(
              "size-8 rounded-lg text-muted-foreground transition-all",
              view === "grid" &&
                "bg-background text-foreground shadow-sm hover:bg-background",
            )}
          >
            <IconLayoutGrid className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onViewChange("table")}
            aria-label="Table view"
            aria-pressed={view === "table"}
            className={cn(
              "size-8 rounded-lg text-muted-foreground transition-all",
              view === "table" &&
                "bg-background text-foreground shadow-sm hover:bg-background",
            )}
          >
            <IconList className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
