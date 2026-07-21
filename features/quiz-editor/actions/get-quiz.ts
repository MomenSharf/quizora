"use server";

import prisma from "@/lib/db/prisma";
import { AppErrors } from "@/lib/errors/app-errors";
import { mapEditorState, mapQuiz } from "../transformers/quiz-mapper";

export async function getQuiz(id: string) {
  const record = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
    },
  });
  

  if (!record) {
    throw AppErrors.notFound("Quiz not found");
  }

  
  const quiz = mapQuiz(record);
  const editorState = mapEditorState(record.editorState);

  return {quiz, editorState};
}