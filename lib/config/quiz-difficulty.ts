export const QUIZ_DIFFICULTIES = [
  {
    value: "BEGINNER",
    label: "Beginner",
    color: "#10B981",
  },
  {
    value: "INTERMEDIATE",
    label: "Intermediate",
    color: "#F59E0B",
  },
  {
    value: "ADVANCED",
    label: "Advanced",
    color: "#F43F5E",
  },
] as const;

export type QuizDifficulty =
  (typeof QUIZ_DIFFICULTIES)[number]["value"];

export type QuizDifficultyConfig =
  (typeof QUIZ_DIFFICULTIES)[number];

export const QUIZ_DIFFICULTY_VALUES = QUIZ_DIFFICULTIES.map(
  ({ value }) => value,
);

export const QUIZ_DIFFICULTY_OPTIONS = QUIZ_DIFFICULTIES.map(
  ({ value, label }) => ({ value, label }),
);

export const QUIZ_DIFFICULTY_LABELS = Object.fromEntries(
  QUIZ_DIFFICULTIES.map(({ value, label }) => [value, label]),
) as Record<QuizDifficulty, string>;

export const getQuizDifficulty = (value: string) =>
  QUIZ_DIFFICULTIES.find((difficulty) => difficulty.value === value);

export const getQuizDifficultyLabel = (value: string) =>
  getQuizDifficulty(value)?.label ?? "Beginner";

export const getQuizDifficultyColor = (value: string) =>
  getQuizDifficulty(value)?.color ?? "#10B981";