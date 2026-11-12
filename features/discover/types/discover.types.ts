
import { Prisma } from "@/lib/db/generated/prisma/client";

import {
  discoverQuizSelect,
  discoverQuizDetailedSelect,
} from "../constants/discover.select";

export type DiscoverSort =
  | "POPULAR"
  | "TRENDING"
  | "NEWEST"
  | "MOST_COMPLETED"
  | "MOST_VIEWED"
  | "MOST_LIKED"
  | "FEATURED";

export type DiscoverQuizOptions<TSelect extends Prisma.QuizSelect> = {
  select: TSelect;
  sort?: DiscoverSort;
  take?: number;
  cursor?: string;
  category?: string;
  language?: string;
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  tags?: string[];
  search?: string;
};

export type DiscoverQuizItem = Prisma.QuizGetPayload<{
  select: typeof discoverQuizSelect;
}>;

export type DiscoverDetailedQuizItem = Prisma.QuizGetPayload<{
  select: typeof discoverQuizDetailedSelect;
}>;
