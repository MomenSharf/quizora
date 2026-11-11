
import type { QuizLibraryItem } from "@/lib/services/quiz-library.service";

const owner = {
  email: "alex@example.com",
  image: null,
  name: "Alex Morgan",
};

function createQuiz({
  id,
  title,
  description,
  category,
  tags,
  questionCount,
  visibility = "PUBLIC",
  publishedAt = new Date("2026-10-15T10:00:00.000Z"),
  createdAt,
  updatedAt,
}: {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  questionCount: number;
  visibility?: QuizLibraryItem["visibility"];
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): QuizLibraryItem {
  return {
    id,
    slug: id,
    title,
    description,
    imageId: null,
    thumbnail: null,
    language: "English",
    category,
    ownerId: "user_01",
    owner,
    visibility,
    editorState: {},
    tags,
    questionCount,
    totalPoints: questionCount * 10,
    publishedAt,
    createdAt,
    updatedAt,
    _count: {
      questions: questionCount,
    },
  };
}

export const demoQuizzes: QuizLibraryItem[] = [
  createQuiz({
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description:
      "Master JavaScript essentials, including variables, data types, functions, arrays, objects, scope, closures, and modern ES6+ features.",
    category: "Programming",
    tags: ["JavaScript", "Web Development", "ES6", "Frontend"],
    questionCount: 20,
    createdAt: new Date("2026-10-10"),
    updatedAt: new Date("2026-11-08"),
  }),

  createQuiz({
    id: "world-geography-challenge",
    title: "World Geography Challenge",
    description:
      "Test your knowledge of countries, capital cities, continents, oceans, mountain ranges, famous landmarks, and world geography.",
    category: "Geography",
    tags: ["Geography", "Countries", "Capitals", "World"],
    questionCount: 25,
    visibility: "UNLISTED",
    createdAt: new Date("2026-10-18"),
    updatedAt: new Date("2026-11-09"),
  }),

  createQuiz({
    id: "human-biology-basics",
    title: "Human Biology: The Basics",
    description:
      "Explore the human body's major organ systems, cell structure, genetics, blood circulation, digestion, and essential biological processes.",
    category: "Science",
    tags: ["Biology", "Human Body", "Anatomy", "Science"],
    questionCount: 18,
    createdAt: new Date("2026-11-01"),
    updatedAt: new Date("2026-11-10"),
    publishedAt: null,
    visibility: "PRIVATE",
  }),

  createQuiz({
    id: "english-grammar-mastery",
    title: "English Grammar Mastery",
    description:
      "Improve your English grammar with questions covering verb tenses, conditionals, articles, prepositions, sentence structure, and punctuation.",
    category: "Languages",
    tags: ["English", "Grammar", "Vocabulary", "Writing"],
    questionCount: 30,
    createdAt: new Date("2026-10-22"),
    updatedAt: new Date("2026-11-07"),
  }),

  createQuiz({
    id: "computer-science-fundamentals",
    title: "Computer Science Fundamentals",
    description:
      "Build a strong foundation in computer science with questions about algorithms, data structures, databases, operating systems, networking, and computational thinking.",
    category: "Computer Science",
    tags: ["Computer Science", "Algorithms", "Databases", "Technology"],
    questionCount: 25,
    createdAt: new Date("2026-10-25"),
    updatedAt: new Date("2026-11-06"),
  }),
];
