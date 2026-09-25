import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";
import { Prisma } from "@/lib/db/generated/prisma/client";
import { EditorState } from "../store";

function serializeEditorState(editorState: EditorState): Prisma.InputJsonValue {
  return {
    navigation: {
      activePanel: editorState.navigation.activePanel as string,
      selectedQuestionId: editorState.navigation.selectedQuestionId,
      isTypeSelectorOpen: editorState.navigation.isTypeSelectorOpen,
    },
    autosave: {
      enabled: editorState.autosave.enabled,
      dirty: editorState.autosave.dirty,
      state: editorState.autosave.state as string,
      error: editorState.autosave.error,
      lastSavedAt: editorState.autosave.lastSavedAt?.toISOString() ?? null,
      lastAttemptAt: editorState.autosave.lastAttemptAt?.toISOString() ?? null,
    },
    history: {
      canUndo: editorState.history.canUndo,
      canRedo: editorState.history.canRedo,
      index: editorState.history.index,
      size: editorState.history.size,
    },
  };
}
function serializeQuestion(
  question: QuizEditor["questions"][number],
  order: number,
): Prisma.QuestionCreateWithoutQuizInput {
  return {
    id: question.id,

    type: question.type,

    title: question.title,

    description: question.description,

    explanation: question.explanation,

    hint: question.hint,

    order,

    image: question.image?.url
      ? {
          create: question.image,
        }
      : undefined,

    tags: question.tags ?? [],

    difficulty: question.difficulty ?? "MEDIUM",

    content: question.content,

    config: question.config,
  };
}

export function serializeNewQuiz({
  quiz,
  editorState,
  ownerId,
}: {
  quiz: QuizEditor;
  editorState: EditorState;
  ownerId: string;
}): Prisma.QuizCreateInput {
  const questionCount = quiz.questions.length;

  return {
    id: quiz.id,

    owner: {
      connect: {
        id: ownerId,
      },
    },

    title: quiz.title,
    description: quiz.description,
    slug: quiz.slug,

    visibility: quiz.visibility,
    tags: quiz.tags,
    editorState: serializeEditorState(editorState),
    questionCount,
    questions: {
      create: quiz.questions.map(serializeQuestion),
    },
  };
}

export function serializeUpdateQuiz(
  quiz: QuizEditor,
  editorState: EditorState,
): Prisma.QuizUpdateInput {
  const questionCount = quiz.questions.length;

  return {
    title: quiz.title,

    description: quiz.description,

    slug: quiz.slug,



    visibility: quiz.visibility,

    tags: quiz.tags,

    editorState: serializeEditorState(editorState),

    questionCount,

    category: quiz.category,

    language: quiz.language,

    thumbnail: quiz.thumbnail?.url ? { create: quiz.thumbnail } : undefined,

    questions: {
      deleteMany: {},

      create: quiz.questions.map(serializeQuestion),
    },
  };
}
