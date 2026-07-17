"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/features/auth/lib/auth-options";
import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";
import { createDefaultQuiz } from "../create-defaults/quiz/create-default-quiz";
import { defaultEditorState } from "../store";
import { serializeNewQuiz } from "../transformers/quiz-serializer";

export async function createNewQuiz() {
  const session = await auth();

  if (!session?.user?.id) {
    throw AppErrors.unauthorized("You must be logged in to create a quiz");
  }

  const quiz = createDefaultQuiz();

  const editorState = {
  ...defaultEditorState,
  navigation: {
    ...defaultEditorState.navigation,
    selectedQuestionId: quiz.questions[0]?.id ?? null,
  },
};


  const data = serializeNewQuiz({
    quiz,
    editorState: editorState,
    ownerId: session.user.id,
  });

  try {
    const createdQuiz = await prisma.quiz.create({
      data,
      select: {
        id: true,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      quizId: createdQuiz.id,
    };
  } catch (error) {
    console.error(error);

    throw AppErrors.internal("Failed to create quiz");
  }
}
