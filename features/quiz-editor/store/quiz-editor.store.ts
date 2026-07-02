import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { DEFAULT_EDITOR, DEFAULT_QUIZ } from "./quiz-editor.defaults";
import { createQuizEditorActions } from "./quiz-editor.actions";
import type { QuizEditorStore } from "./quiz-editor.types";

export const useQuizEditorStore =
  create<QuizEditorStore>()(
    immer((set, get) => ({
      quiz: structuredClone(DEFAULT_QUIZ),

      editor: structuredClone(DEFAULT_EDITOR),

      ...createQuizEditorActions(set, get),
    })),
  );