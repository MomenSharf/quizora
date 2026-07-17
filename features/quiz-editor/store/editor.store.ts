import { create } from "zustand";

import {
  defaultEditorState,
  type EditorPanel,
  type EditorStore,
  type HistoryState,
  type SaveState,
} from "./editor.types";

export const useEditorStore = create<EditorStore>()((set) => ({
  ...defaultEditorState,

  setState: (state) =>
    set((prev) => ({
      ...prev,
      ...state,
    })),

  selectQuestion: (selectedQuestionId) =>
    set((state) => ({
      navigation: {
        ...state.navigation,
        selectedQuestionId,
        isTypeSelectorOpen: false,
      },
    })),

  setTypeSelectorOpen: (open) =>
    set((state) => ({
      navigation: {
        ...state.navigation,
        isTypeSelectorOpen: open,
        selectedQuestionId: null ,
      },
    })),

  setActivePanel: (activePanel: EditorPanel) =>
    set((state) => ({
      navigation: {
        ...state.navigation,
        activePanel,
      },
    })),

  setDirty: (dirty) =>
    set((state) => ({
      autosave: {
        ...state.autosave,
        dirty,
      },
    })),

  setAutosaveEnabled: (enabled) =>
    set((state) => ({
      autosave: {
        ...state.autosave,
        enabled,
      },
    })),

  setSaveState: (saveState: SaveState) =>
    set((state) => ({
      autosave: {
        ...state.autosave,
        state: saveState,
      },
    })),

  setSaveError: (error) =>
    set((state) => ({
      autosave: {
        ...state.autosave,
        error,
      },
    })),

  setLastSavedAt: (lastSavedAt) =>
    set((state) => ({
      autosave: {
        ...state.autosave,
        lastSavedAt,
      },
    })),

  setLastAttemptAt: (lastAttemptAt) =>
    set((state) => ({
      autosave: {
        ...state.autosave,
        lastAttemptAt,
      },
    })),

  setHistory: (history: Partial<HistoryState>) =>
    set((state) => ({
      history: {
        ...state.history,
        ...history,
      },
    })),

  reset: () => set(defaultEditorState),
}));
