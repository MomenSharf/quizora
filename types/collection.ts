import type { Prisma, QuizAttemptStatus, Visibility } from "@/lib/db/generated/prisma/client";

export type CollectionItem = {
  id: string;
  quizId: string;
  kind: "QUIZ" | "ATTEMPT";

  title: string;
  description: string | null;
  thumbnail: {
    id: string,
    url: string
  } | null;

  language: string;
  category: string | null;
  tags: string[];

  status?: QuizAttemptStatus

  questionCount: number;

  visibility?: Visibility;
  publishedAt?: Date | null;

  progress?: {
    answered: number;
    total: number;
  };

  createdAt: Date;
  updatedAt: Date;
};