import { DiscoverQuiz } from "../../constants/discover.select";


export const MOCK_SEARCH_QUIZZES = [
  {
    id: "quiz-1",
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description:
      "Test your knowledge of JavaScript basics, variables, functions, arrays, and modern ES6 features.",
    thumbnail: {
      id: "thumbnail-1",
      url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    },
    category: "PROGRAMMING",
    difficulty: "BEGINNER",
    language: "en",
    estimatedDurationSeconds: 600,
    questionCount: 15,
    playCount: 12450,
    completionCount: 9820,
    owner: {
      id: "user-1",
      name: "Alex Morgan",
      image: "https://i.pravatar.cc/100?img=12",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
  {
    id: "quiz-2",
    slug: "world-history-challenge",
    title: "World History Challenge",
    description:
      "Explore important historical events, ancient civilizations, famous leaders, and turning points in world history.",
    thumbnail: {
      id: "thumbnail-2",
      url: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800",
    },
    category: "HISTORY",
    difficulty: "INTERMEDIATE",
    language: "en",
    estimatedDurationSeconds: 900,
    questionCount: 20,
    playCount: 8650,
    completionCount: 6120,
    owner: {
      id: "user-2",
      name: "Sarah Johnson",
      image: "https://i.pravatar.cc/100?img=47",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },

  {
    id: "quiz-3",
    slug: "advanced-mathematics",
    title: "Advanced Mathematics",
    description:
      "Challenge yourself with equations, algebra, geometry, and mathematical reasoning.",
    thumbnail: {
      id: "thumbnail-3",
      url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    },
    category: "MATHEMATICS",
    difficulty: "ADVANCED",
    language: "en",
    estimatedDurationSeconds: 1800,
    questionCount: 30,
    playCount: 5230,
    completionCount: 2840,
    owner: {
      id: "user-3",
      name: "Daniel Smith",
      image: "https://i.pravatar.cc/100?img=11",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
  {
    id: "quiz-4",
    slug: "general-science-quiz",
    title: "General Science Quiz",
    description:
      "Discover how much you know about physics, chemistry, biology, and the natural world.",
    thumbnail: {
      id: "thumbnail-4",
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    },
    category: "SCIENCE",
    difficulty: "BEGINNER",
    language: "en",
    estimatedDurationSeconds: 480,
    questionCount: 12,
    playCount: 18700,
    completionCount: 15300,
    owner: {
      id: "user-4",
      name: "Emma Wilson",
      image: "https://i.pravatar.cc/100?img=44",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
  {
    id: "quiz-5",
    slug: "arabic-language-mastery",
    title: "Arabic Language Mastery",
    description:
      "Practice Arabic vocabulary, grammar, sentence structure, and language comprehension.",
    thumbnail: {
      id: "thumbnail-5",
      url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800",
    },
    category: "LANGUAGES",
    difficulty: "INTERMEDIATE",
    language: "ar",
    estimatedDurationSeconds: 1200,
    questionCount: 25,
    playCount: 6420,
    completionCount: 4380,
    owner: {
      id: "user-5",
      name: "Omar Hassan",
      image: "https://i.pravatar.cc/100?img=68",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
  {
    id: "quiz-6",
    slug: "computer-science-basics",
    title: "Computer Science Basics",
    description:
      "Learn about algorithms, data structures, computer architecture, and fundamental programming concepts.",
    thumbnail: {
      id: "thumbnail-6",
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    },
    category: "TECHNOLOGY",
    difficulty: "INTERMEDIATE",
    language: "en",
    estimatedDurationSeconds: 1500,
    questionCount: 25,
    playCount: 11200,
    completionCount: 7900,
    owner: {
      id: "user-6",
      name: "Michael Chen",
      image: "https://i.pravatar.cc/100?img=13",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
  {
    id: "quiz-7",
    slug: "english-vocabulary-test",
    title: "English Vocabulary Test",
    description:
      "Improve your vocabulary with questions covering synonyms, antonyms, word meanings, and expressions.",
    thumbnail: {
      id: "thumbnail-7",
      url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    },
    category: "LANGUAGES",
    difficulty: "BEGINNER",
    language: "en",
    estimatedDurationSeconds: 420,
    questionCount: 10,
    playCount: 21500,
    completionCount: 18900,
    owner: {
      id: "user-7",
      name: "Sophia Lee",
      image: "https://i.pravatar.cc/100?img=49",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
  {
    id: "quiz-8",
    slug: "physics-masterclass",
    title: "Physics Masterclass",
    description:
      "Put your physics knowledge to the test with mechanics, energy, electricity, and motion.",
    thumbnail: {
      id: "thumbnail-8",
      url: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800",
    },
    category: "SCIENCE",
    difficulty: "ADVANCED",
    language: "en",
    estimatedDurationSeconds: 2100,
    questionCount: 35,
    playCount: 3980,
    completionCount: 1940,
    owner: {
      id: "user-8",
      name: "James Wilson",
      image: "https://i.pravatar.cc/100?img=14",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
  {
    id: "quiz-9",
    slug: "modern-technology-trends",
    title: "Modern Technology Trends",
    description:
      "Explore artificial intelligence, cybersecurity, cloud computing, and emerging technologies.",
    thumbnail: {
      id: "thumbnail-9",
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    },
    category: "TECHNOLOGY",
    difficulty: "INTERMEDIATE",
    language: "en",
    estimatedDurationSeconds: 720,
    questionCount: 18,
    playCount: 9300,
    completionCount: 6850,
    owner: {
      id: "user-9",
      name: "Olivia Brown",
      image: "https://i.pravatar.cc/100?img=45",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
  {
    id: "quiz-10",
    slug: "french-language-beginner",
    title: "French for Beginners",
    description:
      "Start learning French with essential vocabulary, everyday expressions, and basic grammar.",
    thumbnail: {
      id: "thumbnail-10",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    },
    category: "LANGUAGES",
    difficulty: "BEGINNER",
    language: "fr",
    estimatedDurationSeconds: 600,
    questionCount: 15,
    playCount: 7100,
    completionCount: 5890,
    owner: {
      id: "user-10",
      name: "Lucas Martin",
      image: "https://i.pravatar.cc/100?img=60",
    },
    publishedAt: new Date("2026-10-15T10:00:00.000Z")
  },
] satisfies DiscoverQuiz[];
