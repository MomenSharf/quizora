import type { CollectionItem } from "@/types/collection";
import {
  QuizAttemptLibraryItem,
  QuizLibraryItem,
} from "../services/quiz-service";

export function mapQuizToCollectionItem(quiz: QuizLibraryItem): CollectionItem {
  return {
    id: quiz.id,
    quizId: quiz.id,
    kind: "QUIZ",

    title: quiz.title,
    description: quiz.description,
    thumbnail: quiz.thumbnail,

    language: quiz.language,
    category: quiz.category,
    tags: quiz.tags,

    questionCount: quiz._count.questions,

    visibility: quiz.visibility,
    publishedAt: quiz.publishedAt,

    createdAt: quiz.createdAt,
    updatedAt: quiz.updatedAt,
  };
}

export function mapAttemptToCollectionItem(
  attempt: QuizAttemptLibraryItem,
): CollectionItem {
  const total = attempt.questions.length;

  const answered = attempt.questions.filter(
    (question) => question.status === "ANSWERED",
  ).length;

  return {
    id: attempt.id,
    quizId: attempt.quizId,
    kind: "ATTEMPT",

    title: attempt.quiz.title,
    thumbnail: attempt.quiz.thumbnail,
    
    status: attempt.status,
    
    language: attempt.quiz.language,
    category: attempt.quiz.category,
    tags: attempt.quiz.tags,
    description: attempt.quiz.description,
    
    questionCount: total,

    progress: {
      answered,
      total,
    },

    createdAt: attempt.createdAt,
    updatedAt: attempt.updatedAt,
  };
}
