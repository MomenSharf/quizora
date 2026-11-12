
"use client";

import { useState } from "react";
import {
  IconAdjustmentsHorizontal,
  IconCheck,
  IconChevronDown,
  IconFilter,
  IconX,
} from "@tabler/icons-react";

import { useQuizSearchParams } from "../../hooks/use-quiz-search-params";
import type { QuizSearchFilters as Filters } from "../../hooks/use-quiz-search-params";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SORT_OPTIONS = [
  { label: "Popular", value: "POPULAR" },
  { label: "Trending", value: "TRENDING" },
  { label: "Most completed", value: "MOST_COMPLETED" },
  { label: "Most viewed", value: "MOST_VIEWED" },
  { label: "Most liked", value: "MOST_LIKED" },
  { label: "Featured", value: "FEATURED" },
];

const CATEGORY_OPTIONS = [
  { label: "Programming", value: "PROGRAMMING" },
  { label: "Science", value: "SCIENCE" },
  { label: "Mathematics", value: "MATHEMATICS" },
  { label: "History", value: "HISTORY" },
  { label: "Languages", value: "LANGUAGES" },
  { label: "Technology", value: "TECHNOLOGY" },
];

const DIFFICULTY_OPTIONS = [
  { label: "Easy", value: "EASY" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Hard", value: "HARD" },
];

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Arabic", value: "ar" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
];

const DURATION_OPTIONS = [
  { label: "Short", value: "SHORT" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Long", value: "LONG" },
];

const FILTER_LABELS: Record<keyof Filters, string> = {
  category: "Category",
  difficulty: "Difficulty",
  language: "Language",
  duration: "Duration",
  minQuestions: "Min questions",
  maxQuestions: "Max questions",
  creator: "Creator",
};

function getOptionLabel(
  options: { label: string; value: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function QuizSearchFilters() {
  const [open, setOpen] = useState(false);

  const {
    sort,
    setSort,
    filters,
    setFilters,
    appliedFilters,
    activeFilterCount,
    applyFilters,
    resetFilters,
    clearAll,
    removeFilter,
  } = useQuizSearchParams();

  const activeChips = Object.entries(appliedFilters).filter(
    ([, value]) => Boolean(value),
  ) as [keyof Filters, string][];

  function handleApply() {
    applyFilters();
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <div className="w-full sm:w-48">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-10 w-full rounded-lg border-border/70 bg-background shadow-sm transition-colors hover:bg-muted/40 focus:ring-2 focus:ring-primary/15">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden md:block">
            <Select
              value={filters.difficulty || "ALL"}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  difficulty: value === "ALL" ? "" : value,
                }))
              }
            >
              <SelectTrigger className="h-10 w-40 rounded-lg border-border/70 bg-background shadow-sm">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Any difficulty</SelectItem>
                {DIFFICULTY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden lg:block">
            <Select
              value={filters.category || "ALL"}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  category: value === "ALL" ? "" : value,
                }))
              }
            >
              <SelectTrigger className="h-10 w-44 rounded-lg border-border/70 bg-background shadow-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All categories</SelectItem>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-10 shrink-0 gap-2 rounded-lg border-border/70 bg-background px-3 shadow-sm hover:bg-muted/50"
            >
              <IconAdjustmentsHorizontal className="size-4" />
              <span>More filters</span>

              {activeFilterCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 size-5 justify-center rounded-md p-0 text-[11px]"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-full flex-col gap-0 overflow-hidden border-l p-0 sm:max-w-[440px]"
          >
            <SheetHeader className="space-y-3 border-b bg-muted/20 px-6 py-6 text-left">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border bg-background shadow-sm">
                  <IconFilter className="size-5 text-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <SheetTitle className="text-base font-semibold">
                    Filter quizzes
                  </SheetTitle>
                  <SheetDescription className="mt-1 text-xs">
                    Refine your search to find the right quizzes.
                  </SheetDescription>
                </div>

                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="rounded-md">
                    {activeFilterCount} active
                  </Badge>
                )}
              </div>
            </SheetHeader>

            <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
              <section className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Quiz details</h3>
                  <p className="text-muted-foreground text-xs">
                    Choose the type of quizzes you want to discover.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FilterSelect
                    label="Category"
                    placeholder="All categories"
                    value={filters.category}
                    options={CATEGORY_OPTIONS}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, category: value }))
                    }
                  />

                  <FilterSelect
                    label="Difficulty"
                    placeholder="Any difficulty"
                    value={filters.difficulty}
                    options={DIFFICULTY_OPTIONS}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, difficulty: value }))
                    }
                  />

                  <FilterSelect
                    label="Language"
                    placeholder="Any language"
                    value={filters.language}
                    options={LANGUAGE_OPTIONS}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, language: value }))
                    }
                  />

                  <FilterSelect
                    label="Duration"
                    placeholder="Any duration"
                    value={filters.duration}
                    options={DURATION_OPTIONS}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, duration: value }))
                    }
                  />
                </div>
              </section>

              <Separator />

              <section className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Question count</h3>
                  <p className="text-muted-foreground text-xs">
                    Set a minimum or maximum number of questions.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="min-questions" className="text-xs">
                      Minimum
                    </Label>
                    <Input
                      id="min-questions"
                      type="number"
                      min="1"
                      placeholder="e.g. 5"
                      value={filters.minQuestions}
                      onChange={(event) =>
                        setFilters((prev) => ({
                          ...prev,
                          minQuestions: event.target.value,
                        }))
                      }
                      className="h-10 rounded-lg bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-questions" className="text-xs">
                      Maximum
                    </Label>
                    <Input
                      id="max-questions"
                      type="number"
                      min="1"
                      placeholder="e.g. 30"
                      value={filters.maxQuestions}
                      onChange={(event) =>
                        setFilters((prev) => ({
                          ...prev,
                          maxQuestions: event.target.value,
                        }))
                      }
                      className="h-10 rounded-lg bg-background"
                    />
                  </div>
                </div>
              </section>

              <Separator />

              <section className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Creator</h3>
                  <p className="text-muted-foreground text-xs">
                    Find quizzes from a particular creator.
                  </p>
                </div>

                <Input
                  id="quiz-creator"
                  placeholder="Search by creator name..."
                  value={filters.creator}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      creator: event.target.value,
                    }))
                  }
                  className="h-10 rounded-lg bg-background"
                />
              </section>
            </div>

            <SheetFooter className="border-t bg-background p-5 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-lg sm:flex-1"
                onClick={resetFilters}
              >
                Reset filters
              </Button>

              <Button
                type="button"
                className="h-10 rounded-lg sm:flex-1"
                onClick={handleApply}
              >
                <IconCheck className="mr-2 size-4" />
                Apply filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {activeChips.map(([key, value]) => {
            const options =
              key === "category"
                ? CATEGORY_OPTIONS
                : key === "difficulty"
                  ? DIFFICULTY_OPTIONS
                  : key === "language"
                    ? LANGUAGE_OPTIONS
                    : key === "duration"
                      ? DURATION_OPTIONS
                      : [];

            const label = options.length
              ? getOptionLabel(options, value)
              : value;

            return (
              <Badge
                key={key}
                variant="secondary"
                className="gap-1.5 rounded-lg border border-border/50 px-2.5 py-1.5 font-normal"
              >
                <span className="text-muted-foreground">
                  {FILTER_LABELS[key]}:
                </span>

                <span className="font-medium">{label}</span>

                <button
                  type="button"
                  onClick={() => removeFilter(key)}
                  aria-label={`Remove ${FILTER_LABELS[key]} filter`}
                  className="ml-0.5 rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  <IconX className="size-3.5" />
                </button>
              </Badge>
            );
          })}

          <button
            type="button"
            onClick={clearAll}
            className="px-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>

      <Select
        value={value || "ALL"}
        onValueChange={(nextValue) =>
          onChange(nextValue === "ALL" ? "" : nextValue)
        }
      >
        <SelectTrigger className="h-10 w-full rounded-lg border-border/70 bg-background shadow-sm transition-colors hover:border-border hover:bg-muted/30 focus:ring-2 focus:ring-primary/15">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="rounded-xl">
          <SelectItem value="ALL">{placeholder}</SelectItem>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
