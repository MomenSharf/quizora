import { QuestionType } from "@/lib/db/generated/prisma";
import {
  createQuestion,
  DEFAULT_APPEARANCE,
  DEFAULT_EDITOR,
  DEFAULT_QUIZ,
  DEFAULT_SETTINGS,
} from "./quiz-editor.defaults";
import type {
  QuestionEditor,
  QuizAppearanceEditor,
  QuizEditor,
  QuizMetadata,
  QuizSettingsEditor,
} from "./quiz-editor.types";

interface Store {
  quiz: QuizEditor;
  editor: typeof DEFAULT_EDITOR;
}

interface StoreApi {
  set: (
    fn: (state: Store) => Partial<Store>,
  ) => void;
}

export const createQuizEditorActions = ({
  set,
}: StoreApi) => ({
  loadQuiz(quiz: QuizEditor) {
    set(() => ({
      quiz,
      editor: {
        ...DEFAULT_EDITOR,
      },
    }));
  },

  reset() {
    set(() => ({
      quiz: structuredClone(DEFAULT_QUIZ),
      editor: structuredClone(DEFAULT_EDITOR),
    }));
  },

  updateMetadata(data: Partial<QuizMetadata>) {
    set((state) => ({
      quiz: {
        ...state.quiz,
        metadata: {
          ...state.quiz.metadata,
          ...data,
        },
      },
      editor: {
        ...state.editor,
        dirty: true,
      },
    }));
  },

  updateSettings(data: Partial<QuizSettingsEditor>) {
    set((state) => ({
      quiz: {
        ...state.quiz,
        settings: {
          ...state.quiz.settings,
          ...data,
        },
      },
      editor: {
        ...state.editor,
        dirty: true,
      },
    }));
  },

  updateAppearance(
    data: Partial<QuizAppearanceEditor>,
  ) {
    set((state) => ({
      quiz: {
        ...state.quiz,
        appearance: {
          ...state.quiz.appearance,
          ...data,
        },
      },
      editor: {
        ...state.editor,
        dirty: true,
      },
    }));
  },

  addQuestion(type: QuestionType) {
    set((state) => {
      const question = createQuestion(type);

      return {
        quiz: {
          ...state.quiz,

          questions: {
            ...state.quiz.questions,
            [question.id]: question,
          },

          questionOrder: [
            ...state.quiz.questionOrder,
            question.id,
          ],
        },

        editor: {
          ...state.editor,
          selectedQuestionId: question.id,
          dirty: true,
        },
      };
    });
  },

  updateQuestion(
    id: string,
    data: Partial<QuestionEditor>,
  ) {
    set((state) => ({
      quiz: {
        ...state.quiz,

        questions: {
          ...state.quiz.questions,

          [id]: {
            ...state.quiz.questions[id],
            ...data,
          },
        },
      },

      editor: {
        ...state.editor,
        dirty: true,
      },
    }));
  },

  deleteQuestion(id: string) {
    set((state) => {
      const questions = { ...state.quiz.questions };

      delete questions[id];

      return {
        quiz: {
          ...state.quiz,

          questions,

          questionOrder:
            state.quiz.questionOrder.filter(
              (questionId) => questionId !== id,
            ),
        },

        editor: {
          ...state.editor,
          selectedQuestionId:
            state.editor.selectedQuestionId === id
              ? null
              : state.editor.selectedQuestionId,
          dirty: true,
        },
      };
    });
  },

  duplicateQuestion(id: string) {
    set((state) => {
      const original = state.quiz.questions[id];

      if (!original) return {};

      const duplicated = {
        ...structuredClone(original),
        id: crypto.randomUUID(),
      };

      const index =
        state.quiz.questionOrder.indexOf(id);

      const order = [...state.quiz.questionOrder];

      order.splice(index + 1, 0, duplicated.id);

      return {
        quiz: {
          ...state.quiz,

          questions: {
            ...state.quiz.questions,
            [duplicated.id]: duplicated,
          },

          questionOrder: order,
        },

        editor: {
          ...state.editor,
          selectedQuestionId: duplicated.id,
          dirty: true,
        },
      };
    });
  },

  moveQuestion(from, to) {
    set((state) => {
      const order = [...state.quiz.questionOrder];

      const [item] = order.splice(from, 1);

      order.splice(to, 0, item);

      return {
        quiz: {
          ...state.quiz,
          questionOrder: order,
        },

        editor: {
          ...state.editor,
          dirty: true,
        },
      };
    });
  },

  selectQuestion(id: string | null) {
    set((state) => ({
      editor: {
        ...state.editor,
        selectedQuestionId: id,
      },
    }));
  },

  setDirty(dirty: boolean) {
    set((state) => ({
      editor: {
        ...state.editor,
        dirty,
      },
    }));
  },

  setSaving(saving: boolean) {
    set((state) => ({
      editor: {
        ...state.editor,
        saving,
      },
    }));
  },

  setLastSavedAt(date: Date | null) {
    set((state) => ({
      editor: {
        ...state.editor,
        lastSavedAt: date,
      },
    }));
  },
});