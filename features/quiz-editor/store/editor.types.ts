// store/editor.types.ts

export type EditorPanel = "questions" | "settings" | "publish" | "issues";

export type SaveState =
  "idle" | "pending" | "saving" | "saved" | "error" | "offline";

export interface NavigationState {
  activePanel: EditorPanel;
  selectedQuestionId: string | null;
  isTypeSelectorOpen: boolean;
  isQuestionSelectorOpen: boolean;
}

export interface AutosaveState {
  enabled: boolean;

  dirty: boolean;

  state: SaveState;

  error: string | null;

  lastSavedAt: Date | null;

  lastAttemptAt: Date | null;
}

export interface HistoryState {
  canUndo: boolean;

  canRedo: boolean;

  index: number;

  size: number;
}

export type EditorValidationState = {
  attempted: boolean;
  isValidating: boolean;
  errorCount: number;
  firstErrorPath: string | null;
  lastValidatedAt: Date | null;
};

export interface EditorState {
  navigation: NavigationState;

  autosave: AutosaveState;

  history: HistoryState;

  validation: EditorValidationState;
}

export interface EditorActions {
  setState(state: Partial<EditorState>): void;

  selectQuestion(questionId: string | null): void;

  setTypeSelectorOpen: (open: boolean) => void;

  setQuestionSelectorOpen: (open: boolean) => void;

  setActivePanel(panel: EditorPanel): void;

  setDirty(value: boolean): void;

  setAutosaveEnabled(value: boolean): void;

  setSaveState(state: SaveState): void;

  setSaveError(error: string | null): void;

  setLastSavedAt(date: Date | null): void;

  setLastAttemptAt(date: Date | null): void;

  setHistory(history: Partial<HistoryState>): void;

  setValidationState: (state: Partial<EditorValidationState>) => void;

  resetValidation: () => void;

  reset(): void;
}

export type EditorStore = EditorState & EditorActions;

export const defaultEditorState: EditorState = {
  navigation: {
    activePanel: "questions",
    selectedQuestionId: null,
    isTypeSelectorOpen: false,
    isQuestionSelectorOpen: false,
  },

  autosave: {
    enabled: true,
    dirty: false,
    state: "idle",
    error: null,
    lastSavedAt: null,
    lastAttemptAt: null,
  },

  history: {
    canUndo: false,
    canRedo: false,
    index: 0,
    size: 0,
  },

  validation: {
    attempted: false,
    isValidating: false,
    errorCount: 0,
    firstErrorPath: null,
    lastValidatedAt: null,
  },
};
