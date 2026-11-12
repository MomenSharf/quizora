

import { Prisma } from "@/lib/db/generated/prisma/client";
import type {
  DiscoverQuizOptions,
  DiscoverSort,
} from "../types/discover.types";
import prisma from "@/lib/db/prisma";

function getDiscoverOrderBy(
  sort: DiscoverSort,
): Prisma.QuizOrderByWithRelationInput[] {
  switch (sort) {
    case "POPULAR":
      return [
        { playCount: "desc" },
        { publishedAt: "desc" },
        { id: "desc" },
      ];

    case "TRENDING":
      return [
        { trendingScore: "desc" },
        { playCount: "desc" },
        { id: "desc" },
      ];

    case "TOP_RATED":
      return [
        { averageRating: "desc" },
        { ratingCount: "desc" },
        { id: "desc" },
      ];

    case "MOST_COMPLETED":
      return [
        { completionCount: "desc" },
        { playCount: "desc" },
        { id: "desc" },
      ];

    case "MOST_VIEWED":
      return [
        { viewCount: "desc" },
        { publishedAt: "desc" },
        { id: "desc" },
      ];

    case "MOST_LIKED":
      return [
        { likeCount: "desc" },
        { publishedAt: "desc" },
        { id: "desc" },
      ];

    case "FEATURED":
      return [
        { featuredAt: "desc" },
        { id: "desc" },
      ];

    case "NEWEST":
    default:
      return [
        { publishedAt: "desc" },
        { id: "desc" },
      ];
  }
}

export const discoverService = {
  async getQuizzes<TSelect extends Prisma.QuizSelect>({
    select,
    sort = "NEWEST",
    take = 10,
    cursor,
    category,
    language,
    difficulty,
    tags,
    search,
    minRatingCount = 5,
  }: DiscoverQuizOptions<TSelect>) {
    const safeTake = Math.min(
      Math.max(Math.floor(take), 1),
      50,
    );

    const where: Prisma.QuizWhereInput = {
      visibility: "PUBLIC",

      publishedAt: {
        not: null,
      },

      ...(category && {
        category,
      }),

      ...(language && {
        language,
      }),

      ...(difficulty && {
        difficulty,
      }),

      ...(tags?.length && {
        tags: {
          hasSome: tags,
        },
      }),

      ...(search?.trim() && {
        OR: [
          {
            title: {
              contains: search.trim(),
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search.trim(),
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(sort === "TOP_RATED" && {
        ratingCount: {
          gte: Math.max(1, minRatingCount),
        },
      }),

      ...(sort === "FEATURED" && {
        isFeatured: true,
      }),
    };

    return prisma.quiz.findMany({
      where,
      select,
      orderBy: getDiscoverOrderBy(sort),
      take: safeTake,

      ...(cursor && {
        cursor: {
          id: cursor,
        },
        skip: 1,
      }),
    });
  },
};
