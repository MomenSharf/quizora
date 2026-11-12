import { createId } from "@paralleldrive/cuid2";
import { AttemptQuestionStatus } from "../db/generated/prisma/enums";
import { QuizAttemptLibraryItem } from "../services/quiz-service";
const demoThumbnails = {
  quiz_01: {
    id: "thumb_01",
    key: "demo/javascript.jpg",
    url: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200",
    alt: "JavaScript code displayed on a computer screen",
    caption: "JavaScript Fundamentals",
    ratio: "16:9",
    createdAt: new Date("2026-10-10"),
  },
  quiz_02: {
    id: "thumb_02",
    key: "demo/geography.jpg",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop",
    alt: "Earth viewed from space",
    caption: "Explore the world",
    ratio: "16:9",
    createdAt: new Date("2026-10-18"),
  },
  quiz_03: {
    id: "thumb_03",
    key: "demo/biology.jpg",
    url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200",
    alt: "Human anatomy and biological illustration",
    caption: "Human Biology",
    ratio: "16:9",
    createdAt: new Date("2026-11-01"),
  },
  quiz_04: {
    id: "thumb_04",
    key: "demo/english.jpg",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200",
    alt: "Notebook and pen on a desk",
    caption: "English Grammar",
    ratio: "16:9",
    createdAt: new Date("2026-10-22"),
  },
  quiz_05: {
    id: "thumb_05",
    key: "demo/computer-science.jpg",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
    alt: "Computer circuit board",
    caption: "Computer Science",
    ratio: "16:9",
    createdAt: new Date("2026-10-25"),
  },
};

export const demoAttempts: QuizAttemptLibraryItem[] = [
  {
    id: "attempt_01",
    quizId: "quiz_01",
    status: "IN_PROGRESS",
    createdAt: new Date("2026-11-12T09:00:00.000Z"),
    updatedAt: new Date("2026-11-13T08:30:00.000Z"),
    quiz: demoQuizMetadata("quiz_01", "JavaScript Fundamentals", "Programming"),
    questions: createQuestions(20, 8),
  },
  {
    id: "attempt_02",
    quizId: "quiz_02",
    status: "IN_PROGRESS",
    createdAt: new Date("2026-11-11T14:00:00.000Z"),
    updatedAt: new Date("2026-11-11T14:35:00.000Z"),
    quiz: demoQuizMetadata("quiz_02", "World Geography Challenge", "Geography"),
    questions: createQuestions(25, 12),
  },
  {
    id: "attempt_03",
    quizId: "quiz_03",
    status: "COMPLETED",
    createdAt: new Date("2026-11-10T10:00:00.000Z"),
    updatedAt: new Date("2026-11-10T10:42:00.000Z"),
    quiz: demoQuizMetadata("quiz_03", "Human Biology: The Basics", "Science"),
    questions: createQuestions(18, 18),
  },
  {
    id: "attempt_04",
    quizId: "quiz_04",
    status: "COMPLETED",
    createdAt: new Date("2026-11-08T08:00:00.000Z"),
    updatedAt: new Date("2026-11-08T09:05:00.000Z"),
    quiz: demoQuizMetadata("quiz_04", "English Grammar Mastery", "Languages"),
    questions: createQuestions(30, 30),
  },
  {
    id: "attempt_05",
    quizId: "quiz_05",
    status: "COMPLETED",
    createdAt: new Date("2026-11-06T12:00:00.000Z"),
    updatedAt: new Date("2026-11-06T12:52:00.000Z"),
    quiz: demoQuizMetadata("quiz_05", "Computer Science Fundamentals", "Computer Science"),
    questions: createQuestions(25, 25),
  },
];
function demoQuizMetadata(
  id: keyof typeof demoThumbnails,
  title: string,
  category: string,
) {
  const thumbnail = demoThumbnails[id];

  return {
    id,
    slug: id,
    title,
    description: `Explore important concepts and test your knowledge of ${category.toLowerCase()}.`,
    imageId: thumbnail.id,
    thumbnail,
    language: "English",
    category,
    ownerId: "user_01",
    owner: {
      email: "alex@example.com",
      image: null,
      name: "Alex Morgan",
    },
    visibility: "PUBLIC" as const,
    editorState: {},
    tags: [category, "Learning"],
    questionCount: 20,
    totalPoints: 200,
    publishedAt: new Date("2026-10-15"),
    createdAt: new Date("2026-10-10"),
    updatedAt: new Date("2026-11-10"),
    _count: {
      questions: 20,
    },
  };
}

function createQuestions(total: number, answered: number) {
  return Array.from({ length: total }, (_, index) => ({
    id : createId(),
    status:
      index < answered
        ? AttemptQuestionStatus.ANSWERED
        : AttemptQuestionStatus.UNANSWERED,
  }));
}
