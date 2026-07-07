import type { Question } from "@/features/quiz-editor/validation/question";
import type {
  Quiz,
  QuizAppearance,
  QuizInfo,
  QuizSettings,
} from "@/features/quiz-editor/validation/quiz";
import { QuizStatus } from "@/lib/db/generated/prisma/enums";

export type EditorPanel = "question" | "settings" | "appearance" | "preview";

export type SaveState = "idle" | "saving" | "saved" | "error";

export interface EditorState {
  selectedQuestionId: string | null;

  activePanel: EditorPanel;

  autosaveEnabled: boolean;

  saveState: SaveState;

  lastSavedAt: Date | null;
}

export interface QuizEditor {
  id: string;

  slug: string | null;

  status: QuizStatus;

  version: number;

  info: QuizInfo;

  settings: QuizSettings;

  appearance: QuizAppearance;

  questions: Record<string, Question>;

  questionOrder: string[];
}

export type QuizEditorForm = Omit<
  QuizEditor,
  "id" | "slug" | "status" | "version" | "questionOrder"
>;

export interface QuizEditorActions {
  loadQuiz(quiz: QuizEditor): void;

  reset(): void;

  setSaveState(state: SaveState): void;

  setLastSavedAt(date: Date | null): void;

  setAutosaveEnabled(enabled: boolean): void;

  setActivePanel(panel: EditorPanel): void;

  selectQuestion(id: string | null): void;

  addQuestion(id: string): void;

  deleteQuestion(id: string): void;

  duplicateQuestion(sourceId: string, duplicatedId: string): void;

  moveQuestion(from: number, to: number): void;
}

export interface QuizEditorStore extends QuizEditorActions {
  quiz: QuizEditor;

  editor: EditorState;
}

export type QuizUpdater = (draft: Quiz) => void;

export type QuestionUpdater = (draft: Question) => void;
