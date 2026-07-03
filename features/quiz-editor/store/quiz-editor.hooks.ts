import { useQuizEditorStore } from "./quiz-editor.store";

export const useQuizEditorActions = () =>
  useQuizEditorStore((state) => ({
    loadQuiz: state.loadQuiz,

    reset: state.reset,

    updateInfo: state.updateInfo,

    updateSettings: state.updateSettings,

    updateAppearance: state.updateAppearance,

    addQuestion: state.addQuestion,

    updateQuestion: state.updateQuestion,

    deleteQuestion: state.deleteQuestion,

    duplicateQuestion: state.duplicateQuestion,

    moveQuestion: state.moveQuestion,

    selectQuestion: state.selectQuestion,

    setDirty: state.setDirty,

    setSaving: state.setSaving,

    setLastSavedAt: state.setLastSavedAt,

    setSaveError: state.setSaveError,
  }));