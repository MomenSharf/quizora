import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";
import { Prisma } from "@/lib/db/generated/prisma/client";
import { EditorState } from "../store";

function serializeAppearance(
  appearance: QuizEditor["appearance"],
): Prisma.InputJsonValue {
  return appearance satisfies Prisma.InputJsonValue;
}

function serializeSettings(quiz: QuizEditor): Prisma.InputJsonValue {
  return {
    ...quiz.settings,
    language: quiz.info.language,
    category: quiz.info.category,
  } satisfies Prisma.InputJsonValue;
}

function serializeEditorState(
  editorState: EditorState,
): Prisma.InputJsonValue {
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

    points: question.points,

    order,

    imageUrl: question.imageUrl,

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

  const totalPoints = quiz.questions.reduce(
    (sum, question) => sum + question.points,
    0,
  );

  return {
    id: quiz.id,

    owner: {
      connect: {
        id: ownerId,
      },
    },

    title: quiz.info.title,
    description: quiz.info.description,
    slug: quiz.slug,
    status: quiz.status,
    version: quiz.version,
    visibility: quiz.settings.visibility,
    tags: quiz.info.tags,
    appearance: serializeAppearance(quiz.appearance),
    settings: serializeSettings(quiz),
    editorState: serializeEditorState(editorState),
    questionCount,
    totalPoints,

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

  const totalPoints = quiz.questions.reduce(
    (sum, question) => sum + question.points,
    0,
  );

  return {
    title: quiz.info.title,

    description: quiz.info.description,

    slug: quiz.slug,

    status: quiz.status,

    version: {
      increment: 1,
    },

    visibility: quiz.settings.visibility,

    tags: quiz.info.tags,

    appearance: serializeAppearance(quiz.appearance),

    settings: serializeSettings(quiz),

    editorState: serializeEditorState(editorState),

    questionCount,

    totalPoints,

    questions: {
      deleteMany: {},

      create: quiz.questions.map(serializeQuestion),
    },
  };
}
