import {
  createDefaultEditor,
  createDefaultQuiz,
} from "./quiz-editor.defaults";

import {
  duplicateQuestion,
  getQuestionIndex,
  getNextSelectedQuestionId,
  insertQuestion,
  moveItem,
  removeQuestion,
  removeQuestionFromOrder,
} from "./quiz-editor.utils";

import type {
  QuizEditorActions,
  QuizEditorStore,
} from "./quiz-editor.types";

interface CreateActionsOptions {
  set: (
    recipe: (state: QuizEditorStore) => void,
  ) => void;
}

export function createQuizEditorActions({
  set,
}: CreateActionsOptions): QuizEditorActions {
  return {
    loadQuiz(quiz) {
      set((state) => {
        state.quiz = structuredClone(quiz);
        state.editor = createDefaultEditor();
      });
    },

    reset() {
      set((state) => {
        state.quiz = createDefaultQuiz();
        state.editor = createDefaultEditor();
      });
    },

    setSaveState(saveState) {
      set((state) => {
        state.editor.saveState = saveState;
      });
    },

    setLastSavedAt(lastSavedAt) {
      set((state) => {
        state.editor.lastSavedAt = lastSavedAt;
      });
    },

    setAutosaveEnabled(enabled) {
      set((state) => {
        state.editor.autosaveEnabled = enabled;
      });
    },

    setActivePanel(panel) {
      set((state) => {
        state.editor.activePanel = panel;
      });
    },

    selectQuestion(id) {
      set((state) => {
        state.editor.selectedQuestionId = id;
      });
    },

    addQuestion(id) {
      set((state) => {
        if (state.quiz.questionOrder.includes(id)) {
          return;
        }

        state.quiz.questionOrder.push(id);
        state.editor.selectedQuestionId = id;
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
          state.editor.selectedQuestionId =
            getNextSelectedQuestionId(
              state.quiz.questionOrder,
              id,
            );
        }
      });
    },

    duplicateQuestion(sourceId, duplicatedId) {
      set((state) => {
        const question =
          state.quiz.questions[sourceId];

        if (!question) {
          return;
        }

        state.quiz.questions[duplicatedId] =
          duplicateQuestion(
            question,
            duplicatedId,
          );

        const index = getQuestionIndex(
          state.quiz.questionOrder,
          sourceId,
        );

        state.quiz.questionOrder =
          insertQuestion(
            state.quiz.questionOrder,
            duplicatedId,
            index + 1,
          );

        state.editor.selectedQuestionId =
          duplicatedId;
      });
    },

    moveQuestion(from, to) {
      set((state) => {
        state.quiz.questionOrder = moveItem(
          state.quiz.questionOrder,
          from,
          to,
        );
      });
    },
  };
}