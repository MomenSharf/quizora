import { produce } from "immer";
import { createDefaultEditor, createDefaultQuiz, createQuestionId } from "./quiz-editor.defaults";
import {
  duplicateQuestion,
  getQuestionIndex,
  insertQuestion,
  markDirty,
  moveArrayItem,
  removeQuestion,
  removeQuestionFromOrder,
} from "./quiz-editor.utils";

import type {
  QuizEditorActions,
  QuizEditorStore
} from "./quiz-editor.types";

interface StoreApi {
  set: (
    fn: (state: QuizEditorStore) => void,
  ) => void;
}

export const createQuizEditorActions = ({
  set,
}: StoreApi): QuizEditorActions => ({
  loadQuiz(quiz) {
    set((state) => {
      state.quiz = produce(quiz, () => {});
      state.editor = createDefaultEditor();
    });
  },

  reset() {
    set((state) => {
      state.quiz = createDefaultQuiz();
      state.editor = createDefaultEditor();
    });
  },

  updateInfo(updater) {
    set((state) => {
      updater(state.quiz.quiz.info);

      markDirty(state);
    });
  },

  updateSettings(updater) {
    set((state) => {
      updater(state.quiz.quiz.settings);

      markDirty(state);
    });
  },

  updateAppearance(updater) {
    set((state) => {
      updater(state.quiz.quiz.appearance);

      markDirty(state);
    });
  },

  addQuestion(question) {
    set((state) => {
      state.quiz.questions[question.id] = question;

      state.quiz.questionOrder.push(question.id);

      state.editor.selectedQuestionId = question.id;

      markDirty(state);
    });
  },

  updateQuestion(id, updater) {
    set((state) => {
      const question = state.quiz.questions[id];

      if (!question) return;

      updater(question);

      markDirty(state);
    });
  },

  deleteQuestion(id) {
    set((state) => {
      state.quiz.questions = removeQuestion(
        state.quiz.questions,
        id,
      );

      state.quiz.questionOrder =
        removeQuestionFromOrder(
          state.quiz.questionOrder,
          id,
        );

      if (state.editor.selectedQuestionId === id) {
        state.editor.selectedQuestionId = null;
      }

      markDirty(state);
    });
  },

  duplicateQuestion(id) {
    set((state) => {
      const question = state.quiz.questions[id];

      if (!question) return;

      const duplicated = duplicateQuestion(
        question,
        createQuestionId(),
      );

      state.quiz.questions[duplicated.id] = duplicated;

      const index = getQuestionIndex(
        state.quiz.questionOrder,
        id,
      );

      state.quiz.questionOrder = insertQuestion(
        state.quiz.questionOrder,
        duplicated.id,
        index + 1,
      );

      state.editor.selectedQuestionId = duplicated.id;

      markDirty(state);
    });
  },

  moveQuestion(from, to) {
    set((state) => {
      state.quiz.questionOrder = moveArrayItem(
        state.quiz.questionOrder,
        from,
        to,
      );

      markDirty(state);
    });
  },

  selectQuestion(id) {
    set((state) => {
      state.editor.selectedQuestionId = id;
    });
  },

  setDirty(value) {
    set((state) => {
      state.editor.dirty = value;
    });
  },

  setSaving(value) {
    set((state) => {
      state.editor.saving = value;
    });
  },

  setLastSavedAt(date) {
    set((state) => {
      state.editor.lastSavedAt = date;
    });
  },

  setSaveError(error) {
    set((state) => {
      state.editor.saveError = error;
    });
  },
});