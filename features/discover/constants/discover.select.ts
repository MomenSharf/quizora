import { Prisma } from "@/lib/db/generated/prisma/client";


export const discoverQuizSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  category: true,
  language: true,
  difficulty: true,
  estimatedDurationSeconds: true,

  questionCount: true,
  playCount: true,
  completionCount: true,

 

  publishedAt: true,

  thumbnail: {
    select: {
      id: true,
      url: true,
    },
  },

  owner: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
} satisfies Prisma.QuizSelect;

export const discoverQuizDetailedSelect = {
  ...discoverQuizSelect,

  tags: true,
  totalPoints: true,
  viewCount: true,
  likeCount: true,
  trendingScore: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.QuizSelect;


export type DiscoverQuiz = Prisma.QuizGetPayload<{
  select: typeof discoverQuizSelect;
}>;

export type DiscoverQuizDetailed = Prisma.QuizGetPayload<{
  select: typeof discoverQuizDetailedSelect;
}>;