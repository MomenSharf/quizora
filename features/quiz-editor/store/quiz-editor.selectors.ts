import { useQuizEditorStore } from "./quiz-editor.store";

export const useQuiz = () =>
  useQuizEditorStore((state) => state.quiz);

export const useMetadata = () =>
  useQuizEditorStore((state) => state.quiz.metadata);

export const useSettings = () =>
  useQuizEditorStore((state) => state.quiz.settings);

export const useAppearance = () =>
  useQuizEditorStore((state) => state.quiz.appearance);

export const useQuestions = () =>
  useQuizEditorStore((state) => state.quiz.questions);

export const useQuestionOrder = () =>
  useQuizEditorStore((state) => state.quiz.questionOrder);

export const useEditor = () =>
  useQuizEditorStore((state) => state.editor);

export const useSelectedQuestionId = () =>
  useQuizEditorStore(
    (state) => state.editor.selectedQuestionId,
  );

export const useSelectedQuestion = () =>
  useQuizEditorStore((state) => {
    const id = state.editor.selectedQuestionId;

    if (!id) return undefined;

    return state.quiz.questions[id];
  });

export const useIsDirty = () =>
  useQuizEditorStore((state) => state.editor.dirty);

export const useIsSaving = () =>
  useQuizEditorStore((state) => state.editor.saving);

export const useLastSavedAt = () =>
  useQuizEditorStore(
    (state) => state.editor.lastSavedAt,
  );