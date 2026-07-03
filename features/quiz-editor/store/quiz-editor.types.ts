import { QuizStatus } from "@/lib/db/generated/prisma/enums";
import { Question } from "../validation/question";
import { Quiz } from "../validation/quiz";

export type EditorPanel =
  | "cover"
  | "questions"
  | "appearance"
  | "branching-logic"
  | "results"
  | "settings";

export interface EditorState {
  selectedQuestionId: string | null;

  activePanel: EditorPanel;

  dirty: boolean;

  saving: boolean;

  autosaveEnabled: boolean;

  lastSavedAt: Date | null;

  saveError: string | null;
}

export interface QuizEditor {
  id: string;

  slug: string | null;

  status: QuizStatus;

  version: number;

  quiz: Quiz;

  questions: Record<string, Question>;

  questionOrder: string[];
}

export interface QuizEditorActions {
  loadQuiz(quiz: QuizEditor): void;

  reset(): void;

  updateInfo(updater: (draft: Quiz["info"]) => void): void;

  updateSettings(updater: (draft: Quiz["settings"]) => void): void;

  updateAppearance(updater: (draft: Quiz["appearance"]) => void): void;

  addQuestion(question: Question): void;

  updateQuestion(id: string, updater: (draft: Question) => void): void;

  deleteQuestion(id: string): void;

  duplicateQuestion(id: string): void;

  moveQuestion(from: number, to: number): void;

  selectQuestion(id: string | null): void;

  setDirty(value: boolean): void;

  setSaving(value: boolean): void;

  setLastSavedAt(date: Date | null): void;

  setSaveError(error: string | null): void;
}

export interface QuizEditorStore extends QuizEditorActions {
  quiz: QuizEditor;

  editor: EditorState;
}
