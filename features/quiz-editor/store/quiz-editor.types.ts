import type {
  QuestionType,
  QuizStatus,
  ThemeMode,
  Visibility,
} from "@/lib/db/generated/prisma/client";

export type EditorPanel = "question" | "settings" | "appearance" | "preview";

export interface QuizMetadata {
  id: string;
  title: string;
  description: string | null;
  slug: string | null;
  status: QuizStatus;
  visibility: Visibility;
}

export interface QuizSettingsEditor {
  shuffleQuestions: boolean;
  shuffleOptions: boolean;

  showCorrectAnswers: boolean;
  showExplanation: boolean;

  showScore: boolean;
  showProgressBar: boolean;
  showQuestionNumber: boolean;

  allowBackNavigation: boolean;

  passingScore: number;
  timeLimitMinutes: number | null;
  maxAttempts: number;

  requireAllQuestions: boolean;

  instantFeedback: boolean;
}

export interface QuizAppearanceEditor {
  theme: ThemeMode;

  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;

  backgroundColor: string | null;
  textColor: string | null;

  logoUrl: string | null;
  coverUrl: string | null;

  fontFamily: string | null;

  borderRadius: number;

  customCss: string | null;
}

export interface QuestionSettingsEditor {
  randomizeOptions: boolean;
  multipleAnswers: boolean;
  caseSensitive: boolean;
  allowPartialCredit: boolean;

  minSelections: number | null;
  maxSelections: number | null;

  characterLimit: number | null;
}

export interface QuestionOptionEditor {
  id: string;
  text: string;

  explanation: string | null;

  imageUrl: string | null;

  color: string | null;

  isCorrect: boolean;

  points: number;
}

export interface QuestionBlankEditor {
  id: string;
  answer: string;
  alternativeAnswers: string[];
}

export interface QuestionMatchEditor {
  id: string;
  leftText: string;
  rightText: string;
}

export interface QuestionLocationEditor {
  id: string;
  label: string | null;

  latitude: number;
  longitude: number;

  radiusMeters: number;
}

export interface FlashcardEditor {
  id: string;
  front: string;
  back: string;
  imageUrl: string | null;
}

export interface QuestionEditor {
  id: string;

  type: QuestionType;

  title: string;
  description: string | null;

  explanation: string | null;
  hint: string | null;

  points: number;

  required: boolean;

  imageUrl: string | null;
  audioUrl: string | null;
  videoUrl: string | null;

  settings: QuestionSettingsEditor;

  options: QuestionOptionEditor[];
  blanks: QuestionBlankEditor[];
  matches: QuestionMatchEditor[];
  locations: QuestionLocationEditor[];
  flashcards: FlashcardEditor[];
}

export interface QuizEditor {
  metadata: QuizMetadata;
  settings: QuizSettingsEditor;
  appearance: QuizAppearanceEditor;
  questions: Record<string, QuestionEditor>;
  questionOrder: string[];
}

export interface EditorState {
  selectedQuestionId: string | null;

  activePanel: EditorPanel;

  dirty: boolean;

  saving: boolean;

  autosaveEnabled: boolean;

  lastSavedAt: Date | null;
}

export interface QuizEditorActions {
  loadQuiz(quiz: QuizEditor): void;

  reset(): void;

  updateMetadata(updater: (metadata: QuizMetadata) => void): void;

  updateSettings(updater: (settings: QuizSettingsEditor) => void): void;

  updateAppearance(updater: (appearance: QuizAppearanceEditor) => void): void;

  updateQuestion(id: string, updater: (question: QuestionEditor) => void): void;
  addQuestion(type: QuestionType): void;

  deleteQuestion(id: string): void;

  duplicateQuestion(id: string): void;

  moveQuestion(from: number, to: number): void;

  selectQuestion(id: string | null): void;

  setDirty(dirty: boolean): void;

  setSaving(saving: boolean): void;

  setLastSavedAt(date: Date | null): void;
}

export interface QuizEditorStore extends QuizEditorActions {
  quiz: QuizEditor;

  editor: EditorState;
}
