
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export type QuizSearchFilters = {
  category: string;
  difficulty: string;
  language: string;
  duration: string;
  minQuestions: string;
  maxQuestions: string;
  creator: string;
};

const EMPTY_FILTERS: QuizSearchFilters = {
  category: "",
  difficulty: "",
  language: "",
  duration: "",
  minQuestions: "",
  maxQuestions: "",
  creator: "",
};

function readFilters(params: URLSearchParams): QuizSearchFilters {
  return {
    category: params.get("category") ?? "",
    difficulty: params.get("difficulty") ?? "",
    language: params.get("language") ?? "",
    duration: params.get("duration") ?? "",
    minQuestions: params.get("minQuestions") ?? "",
    maxQuestions: params.get("maxQuestions") ?? "",
    creator: params.get("creator") ?? "",
  };
}

export function useQuizSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsString = searchParams.toString();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "POPULAR");

  const [filters, setFilters] = useState<QuizSearchFilters>(() =>
    readFilters(new URLSearchParams(paramsString)),
  );

  const appliedFilters = useMemo(
    () => readFilters(new URLSearchParams(paramsString)),
    [paramsString],
  );

  const activeFilterCount = useMemo(
    () => Object.values(appliedFilters).filter(Boolean).length,
    [appliedFilters],
  );

  useEffect(() => {
    const params = new URLSearchParams(paramsString);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(params.get("q") ?? "");
    setSort(params.get("sort") ?? "POPULAR");
    setFilters(readFilters(params));
  }, [paramsString]);

  const updateParams = useCallback(
    (updates: Record<string, string>, removePage = true) => {
      const params = new URLSearchParams(paramsString);

      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      if (removePage) params.delete("page");

      const queryString = params.toString();

      router.replace(
        queryString ? `${pathname}?${queryString}` : pathname,
        { scroll: false },
      );
    },
    [paramsString, pathname, router],
  );

  const commitSearch = useCallback(
    (value = query) => {
      setQuery(value);
      updateParams({ q: value.trim() });
    },
    [query, updateParams],
  );

  const changeSort = useCallback(
    (value: string) => {
      setSort(value);
      updateParams({ sort: value });
    },
    [updateParams],
  );

  const applyFilters = useCallback(() => {
    updateParams({
      q: query.trim(),
      sort,
      ...filters,
    });
  }, [filters, query, sort, updateParams]);

  const resetFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, []);

  const clearAll = useCallback(() => {
    setQuery("");
    setSort("POPULAR");
    setFilters(EMPTY_FILTERS);

    router.replace(`${pathname}?sort=POPULAR`, { scroll: false });
  }, [pathname, router]);

  const removeFilter = useCallback(
    (key: keyof QuizSearchFilters) => {
      setFilters((current) => ({ ...current, [key]: "" }));
      updateParams({ [key]: "" });
    },
    [updateParams],
  );

  return {
    query,
    setQuery,
    commitSearch,

    sort,
    setSort: changeSort,

    filters,
    setFilters,

    appliedFilters,
    activeFilterCount,

    applyFilters,
    resetFilters,
    clearAll,
    removeFilter,
  };
}
