"use server";

import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { tryCatchAsync } from "@/lib/utils/try-catch";
import { quizEditorService } from "../services/quiz-editor.service";
import type { EditorState } from "../store";

export const publishQuiz = async (
  quiz: QuizEditor,
  editorState: EditorState,
) =>
  tryCatchAsync(async () => {
    const session = await requireAuth();

    const result = await quizEditorService.publishQuiz(
      quiz,
      editorState,
      session.user.id,
    );

    return {
      ...result,
      message: "Quiz published successfully.",
    };
  });