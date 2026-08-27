export const QUIZ_CATEGORIES = [
  {
    value: "general-knowledge",
    label: "General Knowledge",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "mathematics",
    label: "Mathematics",
  },
  {
    value: "history",
    label: "History",
  },
  {
    value: "geography",
    label: "Geography",
  },
  {
    value: "language",
    label: "Language",
  },
  {
    value: "literature",
    label: "Literature",
  },
  {
    value: "arts",
    label: "Arts",
  },
  {
    value: "music",
    label: "Music",
  },
  {
    value: "movies-tv",
    label: "Movies & TV",
  },
  {
    value: "games",
    label: "Games",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "economics",
    label: "Economics",
  },
  {
    value: "programming",
    label: "Programming",
  },
  {
    value: "health",
    label: "Health & Wellness",
  },
  {
    value: "food",
    label: "Food & Cooking",
  },
  {
    value: "nature",
    label: "Nature & Animals",
  },
  {
    value: "psychology",
    label: "Psychology",
  },
  {
    value: "philosophy",
    label: "Philosophy",
  },
  {
    value: "religion",
    label: "Religion & Spirituality",
  },
  {
    value: "travel",
    label: "Travel",
  },
  {
    value: "culture",
    label: "Culture",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "current-events",
    label: "Current Events",
  },
  {
    value: "other",
    label: "Other",
  },
] as const;

export type QuizCategory =
  (typeof QUIZ_CATEGORIES)[number]["value"];