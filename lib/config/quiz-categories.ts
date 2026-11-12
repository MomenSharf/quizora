
import {
  IconAtom,
  IconBallFootball,
  IconBook2,
  IconBrain,
  IconBriefcase,
  IconBuildingCastle,
  IconBulb,
  IconCategory,
  IconChartLine,
  IconCode,
  IconCpu,
  IconDeviceGamepad2,
  IconGlobe,
  IconHeartRateMonitor,
  IconLanguage,
  IconLeaf,
  IconMasksTheater,
  IconMath,
  IconMovie,
  IconMusic,
  IconNews,
  IconPalette,
  IconPlane,
  IconPray,
  IconSchool,
  IconToolsKitchen2,
  IconUsers,
} from "@tabler/icons-react";

const colors = {
  violet: {
    background: "bg-violet-500/10",
    foreground: "text-violet-600 dark:text-violet-400",
    hover: "group-hover:bg-violet-500/15",
    border: "group-hover:border-violet-500/30",
    decoration: "bg-violet-500/5",
  },
  blue: {
    background: "bg-blue-500/10",
    foreground: "text-blue-600 dark:text-blue-400",
    hover: "group-hover:bg-blue-500/15",
    border: "group-hover:border-blue-500/30",
    decoration: "bg-blue-500/5",
  },
  cyan: {
    background: "bg-cyan-500/10",
    foreground: "text-cyan-600 dark:text-cyan-400",
    hover: "group-hover:bg-cyan-500/15",
    border: "group-hover:border-cyan-500/30",
    decoration: "bg-cyan-500/5",
  },
  amber: {
    background: "bg-amber-500/10",
    foreground: "text-amber-600 dark:text-amber-400",
    hover: "group-hover:bg-amber-500/15",
    border: "group-hover:border-amber-500/30",
    decoration: "bg-amber-500/5",
  },
  emerald: {
    background: "bg-emerald-500/10",
    foreground: "text-emerald-600 dark:text-emerald-400",
    hover: "group-hover:bg-emerald-500/15",
    border: "group-hover:border-emerald-500/30",
    decoration: "bg-emerald-500/5",
  },
  rose: {
    background: "bg-rose-500/10",
    foreground: "text-rose-600 dark:text-rose-400",
    hover: "group-hover:bg-rose-500/15",
    border: "group-hover:border-rose-500/30",
    decoration: "bg-rose-500/5",
  },
  orange: {
    background: "bg-orange-500/10",
    foreground: "text-orange-600 dark:text-orange-400",
    hover: "group-hover:bg-orange-500/15",
    border: "group-hover:border-orange-500/30",
    decoration: "bg-orange-500/5",
  },
  pink: {
    background: "bg-pink-500/10",
    foreground: "text-pink-600 dark:text-pink-400",
    hover: "group-hover:bg-pink-500/15",
    border: "group-hover:border-pink-500/30",
    decoration: "bg-pink-500/5",
  },
  indigo: {
    background: "bg-indigo-500/10",
    foreground: "text-indigo-600 dark:text-indigo-400",
    hover: "group-hover:bg-indigo-500/15",
    border: "group-hover:border-indigo-500/30",
    decoration: "bg-indigo-500/5",
  },
  teal: {
    background: "bg-teal-500/10",
    foreground: "text-teal-600 dark:text-teal-400",
    hover: "group-hover:bg-teal-500/15",
    border: "group-hover:border-teal-500/30",
    decoration: "bg-teal-500/5",
  },
  lime: {
    background: "bg-lime-500/10",
    foreground: "text-lime-700 dark:text-lime-400",
    hover: "group-hover:bg-lime-500/15",
    border: "group-hover:border-lime-500/30",
    decoration: "bg-lime-500/5",
  },
  sky: {
    background: "bg-sky-500/10",
    foreground: "text-sky-600 dark:text-sky-400",
    hover: "group-hover:bg-sky-500/15",
    border: "group-hover:border-sky-500/30",
    decoration: "bg-sky-500/5",
  },
} as const;

export const QUIZ_CATEGORIES = [
  {
    value: "general-knowledge",
    label: "General Knowledge",
    icon: IconBrain,
    color: colors.violet,
  },
  {
    value: "science",
    label: "Science",
    icon: IconAtom,
    color: colors.cyan,
  },
  {
    value: "technology",
    label: "Technology",
    icon: IconCpu,
    color: colors.blue,
  },
  {
    value: "mathematics",
    label: "Mathematics",
    icon: IconMath,
    color: colors.indigo,
  },
  {
    value: "history",
    label: "History",
    icon: IconBuildingCastle,
    color: colors.amber,
  },
  {
    value: "geography",
    label: "Geography",
    icon: IconGlobe,
    color: colors.sky,
  },
  {
    value: "language",
    label: "Language",
    icon: IconLanguage,
    color: colors.teal,
  },
  {
    value: "literature",
    label: "Literature",
    icon: IconBook2,
    color: colors.orange,
  },
  {
    value: "arts",
    label: "Arts",
    icon: IconPalette,
    color: colors.pink,
  },
  {
    value: "music",
    label: "Music",
    icon: IconMusic,
    color: colors.violet,
  },
  {
    value: "movies-tv",
    label: "Movies & TV",
    icon: IconMovie,
    color: colors.rose,
  },
  {
    value: "games",
    label: "Games",
    icon: IconDeviceGamepad2,
    color: colors.indigo,
  },
  {
    value: "sports",
    label: "Sports",
    icon: IconBallFootball,
    color: colors.emerald,
  },
  {
    value: "business",
    label: "Business",
    icon: IconBriefcase,
    color: colors.blue,
  },
  {
    value: "economics",
    label: "Economics",
    icon: IconChartLine,
    color: colors.teal,
  },
  {
    value: "programming",
    label: "Programming",
    icon: IconCode,
    color: colors.violet,
  },
  {
    value: "health",
    label: "Health & Wellness",
    icon: IconHeartRateMonitor,
    color: colors.rose,
  },
  {
    value: "food",
    label: "Food & Cooking",
    icon: IconToolsKitchen2,
    color: colors.orange,
  },
  {
    value: "nature",
    label: "Nature & Animals",
    icon: IconLeaf,
    color: colors.lime,
  },
  {
    value: "psychology",
    label: "Psychology",
    icon: IconUsers,
    color: colors.pink,
  },
  {
    value: "philosophy",
    label: "Philosophy",
    icon: IconBulb,
    color: colors.amber,
  },
  {
    value: "religion",
    label: "Religion & Spirituality",
    icon: IconPray,
    color: colors.indigo,
  },
  {
    value: "travel",
    label: "Travel",
    icon: IconPlane,
    color: colors.sky,
  },
  {
    value: "culture",
    label: "Culture",
    icon: IconMasksTheater,
    color: colors.pink,
  },
  {
    value: "education",
    label: "Education",
    icon: IconSchool,
    color: colors.blue,
  },
  {
    value: "current-events",
    label: "Current Events",
    icon: IconNews,
    color: colors.orange,
  },
  {
    value: "other",
    label: "Other",
    icon: IconCategory,
    color: colors.violet,
  },
] as const;

export type QuizCategory = (typeof QUIZ_CATEGORIES)[number]["value"];

export type QuizCategoryConfig = (typeof QUIZ_CATEGORIES)[number];

export const QUIZ_CATEGORY_VALUES = QUIZ_CATEGORIES.map(
  (category) => category.value,
);

export const QUIZ_CATEGORY_OPTIONS = QUIZ_CATEGORIES.map(
  ({ value, label }) => ({ value, label }),
);

export const QUIZ_CATEGORY_LABELS = Object.fromEntries(
  QUIZ_CATEGORIES.map(({ value, label }) => [value, label]),
) as Record<QuizCategory, string>;

export const getQuizCategory = (value: string) =>
  QUIZ_CATEGORIES.find((category) => category.value === value);

export const getQuizCategoryLabel = (value: string) =>
  getQuizCategory(value)?.label ?? "Other";
