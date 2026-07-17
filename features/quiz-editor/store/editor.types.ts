// store/editor.types.ts

export type EditorPanel =
  | "cover"
  | "questions"
  | "design"
  | "settings"
  | "results"
  | "logic"
  | "publish";

export type SaveState =
  "idle" | "pending" | "saving" | "saved" | "error" | "offline";

export interface NavigationState {
  activePanel: EditorPanel;
  selectedQuestionId: string | null;
  isTypeSelectorOpen: boolean;
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

export interface EditorState {
  navigation: NavigationState;

  autosave: AutosaveState;

  history: HistoryState;
}

export interface EditorActions {
  setState(state: Partial<EditorState>): void;
  
  selectQuestion(questionId: string | null): void;

  setTypeSelectorOpen: (open: boolean) => void;

  setActivePanel(panel: EditorPanel): void;

  setDirty(value: boolean): void;

  setAutosaveEnabled(value: boolean): void;

  setSaveState(state: SaveState): void;

  setSaveError(error: string | null): void;

  setLastSavedAt(date: Date | null): void;

  setLastAttemptAt(date: Date | null): void;

  setHistory(history: Partial<HistoryState>): void;

  reset(): void;
}

export type EditorStore = EditorState & EditorActions;

export const defaultEditorState: EditorState = {
  navigation: {
    activePanel: "questions",
    selectedQuestionId: null,
    isTypeSelectorOpen: false,
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
};
