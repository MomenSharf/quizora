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
import { QuizEditorSchema, type QuizEditor } from "../validation/quiz";

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
            explanationImage: true,
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

    const data = serializeUpdateQuiz(quiz, editorState);
    const parsed = QuizEditorSchema.safeParse(quiz);

    const visibility = parsed.success ? quiz.visibility : "PRIVATE";

    const questions = quiz.questions;

    const questionCount = questions.length;

    const totalPoints = questions.reduce(
      (total, question) => total + (question.points ?? 0),
      0,
    );
    const estimatedDurationSeconds = questions.reduce(
      (total, question) => total + (question.timeLimitSeconds ?? 0),
      0,
    );

    await prisma.quiz.update({
      where: {
        id: quiz.id,
      },
      data: {
        ...data,
        visibility,
        preferredVisibility: quiz.visibility,
        questionCount,
        totalPoints,
        estimatedDurationSeconds,
      },
    });

    return {
      savedAt: new Date(),
    };
  },

  async publishQuiz(
    quiz: QuizEditor,
    editorState: EditorState,
    ownerId: string,
  ) {
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

    const parsed = QuizEditorSchema.safeParse(quiz);

    if (!parsed.success) {
      throw AppErrors.badRequest("Quiz has validation errors");
    }

    const data = serializeUpdateQuiz(quiz, editorState);
    const questions = quiz.questions;

    const questionCount = questions.length;

    const totalPoints = questions.reduce(
      (total, question) => total + (question.points ?? 0),
      0,
    );

    const estimatedDurationSeconds = questions.reduce(
      (total, question) => total + (question.timeLimitSeconds ?? 0),
      0,
    );

    const publishedAt = new Date();

    await prisma.quiz.update({
      where: {
        id: quiz.id,
      },
      data: {
        ...data,
        visibility: "PUBLIC",
        publishedAt,
        questionCount,
        totalPoints,
        estimatedDurationSeconds,
      },
    });

    return {
      publishedAt,
    };
  },
};
