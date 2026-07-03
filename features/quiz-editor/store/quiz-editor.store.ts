import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  createDefaultEditor,
  createDefaultQuiz,
} from "./quiz-editor.defaults";
import { createQuizEditorActions } from "./quiz-editor.actions";
import type { QuizEditorStore } from "./quiz-editor.types";

export const useQuizEditorStore =
  create<QuizEditorStore>()(
    immer((set) => ({
      quiz: createDefaultQuiz(),

      editor: createDefaultEditor(),

      ...createQuizEditorActions({
        set,
      }),
    })),
  );