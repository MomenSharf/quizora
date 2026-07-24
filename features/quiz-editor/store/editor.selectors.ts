"use client";

import { useShallow } from "zustand/react/shallow";

import { useEditorStore } from "./editor.store";

export const useEditor = () =>
  useEditorStore(
    useShallow((state) => ({
      navigation: state.navigation,
      autosave: state.autosave,
      history: state.history,
    })),
  );

export const useNavigation = () => useEditorStore((state) => state.navigation);

export const useAutosave = () => useEditorStore((state) => state.autosave);

export const useHistory = () => useEditorStore((state) => state.history);

export const useSelectedQuestionId = () =>
  useEditorStore((state) => state.navigation.selectedQuestionId);

export const useIsTypeSelectorOpen = () =>
  useEditorStore((state) => state.navigation.isTypeSelectorOpen);

export const useIsQuestionSelectorOpen = () =>
  useEditorStore((state) => state.navigation.isQuestionSelectorOpen);

export const useActivePanel = () =>
  useEditorStore((state) => state.navigation.activePanel);

export const useDirty = () => useEditorStore((state) => state.autosave.dirty);

export const useAutosaveEnabled = () =>
  useEditorStore((state) => state.autosave.enabled);

export const useSaveState = () =>
  useEditorStore((state) => state.autosave.state);

export const useSaveError = () =>
  useEditorStore((state) => state.autosave.error);

export const useLastSavedAt = () =>
  useEditorStore((state) => state.autosave.lastSavedAt);

export const useLastAttemptAt = () =>
  useEditorStore((state) => state.autosave.lastAttemptAt);

export const useCanUndo = () =>
  useEditorStore((state) => state.history.canUndo);

export const useCanRedo = () =>
  useEditorStore((state) => state.history.canRedo);

export const useEditorActions = () =>
  useEditorStore(
    useShallow((state) => ({
      setState: state.setState,
      selectQuestion: state.selectQuestion,
      setTypeSelectorOpen: state.setTypeSelectorOpen,
      setQuestionSelectorOpen: state.setQuestionSelectorOpen,
      setActivePanel: state.setActivePanel,
      setDirty: state.setDirty,
      setAutosaveEnabled: state.setAutosaveEnabled,
      setSaveState: state.setSaveState,
      setSaveError: state.setSaveError,
      setLastSavedAt: state.setLastSavedAt,
      setLastAttemptAt: state.setLastAttemptAt,
      setHistory: state.setHistory,
      reset: state.reset,
    })),
  );
