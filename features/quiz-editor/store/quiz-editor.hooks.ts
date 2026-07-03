import { useFormContext, useWatch } from "react-hook-form";

import type { Question } from "@/features/quiz-editor/validation/question";
import type { QuizEditorForm } from "./quiz-editor.types";

import { useQuizEditorStore } from "./quiz-editor.store";

export function useEditor() {
  return useQuizEditorStore((state) => state.editor);
}

export function useEditorActions() {
  return useQuizEditorStore((state) => ({
    loadQuiz: state.loadQuiz,

    reset: state.reset,

    setSaveState: state.setSaveState,

    setLastSavedAt: state.setLastSavedAt,

    setAutosaveEnabled: state.setAutosaveEnabled,

    setActivePanel: state.setActivePanel,

    selectQuestion: state.selectQuestion,

    addQuestion: state.addQuestion,

    deleteQuestion: state.deleteQuestion,

    duplicateQuestion: state.duplicateQuestion,

    moveQuestion: state.moveQuestion,
  }));
}

export function useSelectedQuestionId() {
  return useQuizEditorStore(
    (state) => state.editor.selectedQuestionId,
  );
}

export function useQuestionOrder() {
  return useQuizEditorStore(
    (state) => state.quiz.questionOrder,
  );
}

export function useQuestionCount() {
  return useQuizEditorStore(
    (state) => state.quiz.questionOrder.length,
  );
}

export function useActivePanel() {
  return useQuizEditorStore(
    (state) => state.editor.activePanel,
  );
}

export function useSaveState() {
  return useQuizEditorStore(
    (state) => state.editor.saveState,
  );
}

export function useAutosaveEnabled() {
  return useQuizEditorStore(
    (state) => state.editor.autosaveEnabled,
  );
}

export function useLastSavedAt() {
  return useQuizEditorStore(
    (state) => state.editor.lastSavedAt,
  );
}

export function useQuizForm() {
  return useFormContext<QuizEditorForm>();
}

export function useQuizInfo() {
  const { control } = useQuizForm();

  return useWatch({
    control,
    name: "info",
  });
}

export function useQuizSettings() {
  const { control } = useQuizForm();

  return useWatch({
    control,
    name: "settings",
  });
}

export function useQuizAppearance() {
  const { control } = useQuizForm();

  return useWatch({
    control,
    name: "appearance",
  });
}

export function useQuestions() {
  const { control } = useQuizForm();

  return useWatch({
    control,
    name: "questions",
  });
}

export function useQuestion(id: string): Question | undefined {
  const questions = useQuestions();

  return questions[id];
}

export function useSelectedQuestion(): Question | undefined {
  const id = useSelectedQuestionId();

  const questions = useQuestions();

  if (!id) {
    return undefined;
  }

  return questions[id];
}