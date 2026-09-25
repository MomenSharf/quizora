import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";
import { tryCatchAsync } from "@/lib/utils/try-catch";

import { createDefaultQuiz } from "../create-defaults/quiz/create-default-quiz";
import { defaultEditorState, type EditorState } from "../store";
import { mapEditorState, mapQuiz } from "../transformers/quiz-mapper";
import {
  serializeNewQuiz,
  serializeUpdateQuiz,
} from "../transformers/quiz-serializer";
import type { QuizEditor } from "../validation/quiz";

export const quizEditorService = {
  async getQuiz(id: string, ownerId: string) {
    const record = await prisma.quiz.findFirst({
      where: {
        id,
        ownerId,
      },
      include: {
        questions: {
          include: {
            image: true,
          },
        },
        thumbnail: true,
      },
    });

    if (!record) {
      throw AppErrors.notFound("Quiz not found");
    }

    return {
      quiz: mapQuiz(record),
      editorState: mapEditorState(record.editorState),
    };
  },

  async createQuiz(ownerId: string) {
    const quiz = createDefaultQuiz();

    const editorState: EditorState = {
      ...defaultEditorState,
      navigation: {
        ...defaultEditorState.navigation,
        selectedQuestionId: quiz.questions[0]?.id ?? null,
      },
    };

    const data = serializeNewQuiz({
      quiz,
      editorState,
      ownerId,
    });

    const createdQuiz = await prisma.quiz.create({
      data,
      select: {
        id: true,
      },
    });

    return {
      quizId: createdQuiz.id,
    };
  },

  async saveQuiz(quiz: QuizEditor, editorState: EditorState, ownerId: string) {
    const exists = await prisma.quiz.findFirst({
      where: {
        id: quiz.id,
        ownerId,
      },
      select: {
        id: true,
      },
    });

    if (!exists) {
      throw AppErrors.notFound("Quiz not found");
    }

    await prisma.quiz.update({
      where: {
        id: quiz.id,
      },
      data: serializeUpdateQuiz(quiz, editorState),
    });

    return {
      savedAt: new Date(),
    };
  },
};
