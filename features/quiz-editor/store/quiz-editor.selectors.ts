import { useQuizEditorStore } from "./quiz-editor.store";

export const useQuiz = () => useQuizEditorStore((state) => state.quiz);

export const useEditor = () => useQuizEditorStore((state) => state.editor);

export const useQuizInfo = () =>
  useQuizEditorStore((state) => state.quiz.quiz.info);

export const useQuizSettings = () =>
  useQuizEditorStore((state) => state.quiz.quiz.settings);

export const useQuizAppearance = () =>
  useQuizEditorStore((state) => state.quiz.quiz.appearance);

export const useQuestions = () =>
  useQuizEditorStore((state) => state.quiz.questions);

export const useQuestionOrder = () =>
  useQuizEditorStore((state) => state.quiz.questionOrder);

export const useQuestionCount = () =>
  useQuizEditorStore((state) => state.quiz.questionOrder.length);

export const useSelectedQuestionId = () =>
  useQuizEditorStore((state) => state.editor.selectedQuestionId);

export const useSelectedQuestion = () =>
  useQuizEditorStore((state) => {
    const id = state.editor.selectedQuestionId;

    return id ? state.quiz.questions[id] : undefined;
  });

export const useQuestion = (id: string) =>
  useQuizEditorStore((state) => state.quiz.questions[id]);

export const useQuestionIndex = (id: string) =>
  useQuizEditorStore((state) => state.quiz.questionOrder.indexOf(id));

export const useHasQuestions = () =>
  useQuizEditorStore((state) => state.quiz.questionOrder.length > 0);

export const useIsDirty = () =>
  useQuizEditorStore((state) => state.editor.dirty);

export const useIsSaving = () =>
  useQuizEditorStore((state) => state.editor.saving);

export const useAutosaveEnabled = () =>
  useQuizEditorStore((state) => state.editor.autosaveEnabled);

export const useLastSavedAt = () =>
  useQuizEditorStore((state) => state.editor.lastSavedAt);

export const useSaveError = () =>
  useQuizEditorStore((state) => state.editor.saveError);

export const useActivePanel = () =>
  useQuizEditorStore((state) => state.editor.activePanel);
