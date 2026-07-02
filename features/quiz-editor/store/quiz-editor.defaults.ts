import { nanoid } from "nanoid";
import { QuestionType, ThemeMode } from "@/lib/db/generated/prisma/client";

import type {
  EditorState,
  FlashcardEditor,
  QuestionBlankEditor,
  QuestionEditor,
  QuestionLocationEditor,
  QuestionMatchEditor,
  QuestionOptionEditor,
  QuestionSettingsEditor,
  QuizAppearanceEditor,
  QuizEditor,
  QuizMetadata,
  QuizSettingsEditor,
} from "./quiz-editor.types";

export const DEFAULT_METADATA: QuizMetadata = {
  id: "",
  title: "",
  description: null,
  slug: null,
  status: "DRAFT",
  visibility: "PRIVATE",
};

export const DEFAULT_SETTINGS: QuizSettingsEditor = {
  shuffleQuestions: false,
  shuffleOptions: false,

  showCorrectAnswers: true,
  showExplanation: true,

  showScore: true,
  showProgressBar: true,
  showQuestionNumber: true,

  allowBackNavigation: true,

  passingScore: 50,
  timeLimitMinutes: null,

  maxAttempts: 1,

  requireAllQuestions: true,

  instantFeedback: false,
};

export const DEFAULT_APPEARANCE: QuizAppearanceEditor = {
  theme: ThemeMode.SYSTEM,

  primaryColor: null,
  secondaryColor: null,
  accentColor: null,

  backgroundColor: null,
  textColor: null,

  logoUrl: null,
  coverUrl: null,

  fontFamily: null,

  borderRadius: 12,

  customCss: null,
};

export const createQuestionSettings =
  (): QuestionSettingsEditor => ({
    randomizeOptions: false,
    multipleAnswers: false,
    caseSensitive: false,
    allowPartialCredit: false,
    minSelections: null,
    maxSelections: null,
    characterLimit: null,
  });

export const createOption =
  (): QuestionOptionEditor => ({
    id: nanoid(),
    text: "",
    explanation: null,
    imageUrl: null,
    color: null,
    isCorrect: false,
    points: 0,
  });

export const createBlank =
  (): QuestionBlankEditor => ({
    id: nanoid(),
    answer: "",
    alternativeAnswers: [],
  });

export const createMatch =
  (): QuestionMatchEditor => ({
    id: nanoid(),
    leftText: "",
    rightText: "",
  });

export const createLocation =
  (): QuestionLocationEditor => ({
    id: nanoid(),
    label: null,
    latitude: 0,
    longitude: 0,
    radiusMeters: 100,
  });

export const createFlashcard =
  (): FlashcardEditor => ({
    id: nanoid(),
    front: "",
    back: "",
    imageUrl: null,
  });

export const createQuestion = (
  type: QuestionType,
): QuestionEditor => ({
  id: nanoid(),

  type,

  title: "",
  description: null,

  explanation: null,
  hint: null,

  points: 1,

  required: true,

  imageUrl: null,
  audioUrl: null,
  videoUrl: null,

  settings: createQuestionSettings(),

  options: [],
  blanks: [],
  matches: [],
  locations: [],
  flashcards: [],
});

export const DEFAULT_QUIZ: QuizEditor = {
  metadata: DEFAULT_METADATA,
  settings: DEFAULT_SETTINGS,
  appearance: DEFAULT_APPEARANCE,

  questions: {},
  questionOrder: [],
};

export const DEFAULT_EDITOR: EditorState = {
  selectedQuestionId: null,

  activePanel: "question",

  dirty: false,

  saving: false,

  autosaveEnabled: true,

  lastSavedAt: null,
};