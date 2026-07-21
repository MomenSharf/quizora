import { Prisma, QuestionType } from "@/lib/db/generated/prisma/client";

import {
  DropdownQuestion,
  FillBlankQuestion,
  FlashcardsQuestion,
  GuessQuestion,
  LocationQuestion,
  MatchQuestion,
  MultipleSelectQuestion,
  OrderingQuestion,
  Question,
  RangeQuestion,
  SingleSelectQuestion,
  TapFindQuestion,
  TrueFalseQuestion,
  TypeAnswerQuestion,
} from "@/features/quiz-editor/validation/question";
import type {
  QuizAppearance,
  QuizEditor,
  QuizSettings,
} from "@/features/quiz-editor/validation/quiz";



import { createDefaultQuiz } from "../create-defaults/quiz/create-default-quiz";
import { defaultEditorState, type EditorState } from "../store";

type PrismaQuiz = Prisma.QuizGetPayload<{
  include: {
    questions: true;
  };
}>;

const defaultQuiz = createDefaultQuiz()
const defaultQuizSettings = defaultQuiz.settings
const defaultQuizAppearance = defaultQuiz.appearance

function mapAppearance(
  value: Prisma.JsonValue | null,
): QuizAppearance {
  return {
    ...defaultQuizAppearance,
    ...((value as Partial<QuizAppearance>) ?? {}),
  };
}

function mapSettings(
  value: Prisma.JsonValue | null,
  visibility: PrismaQuiz["visibility"],
): QuizSettings {
  return {
    ...defaultQuizSettings,
    ...((value as Partial<QuizSettings>) ?? {}),
    visibility,
  };
}

export function mapEditorState(state: Prisma.JsonValue): EditorState {
  const editorState = (state as Partial<EditorState>) ?? {};

  return {
    navigation: {
      activePanel:
        editorState.navigation?.activePanel ??
        defaultEditorState.navigation.activePanel,

      selectedQuestionId:
        editorState.navigation?.selectedQuestionId ??
        defaultEditorState.navigation.selectedQuestionId,

      isTypeSelectorOpen:
        editorState.navigation?.isTypeSelectorOpen ??
        defaultEditorState.navigation.isTypeSelectorOpen,
    },

    autosave: {
      enabled:
        editorState.autosave?.enabled ??
        defaultEditorState.autosave.enabled,

      dirty:
        editorState.autosave?.dirty ??
        defaultEditorState.autosave.dirty,

      state:
        editorState.autosave?.state ??
        defaultEditorState.autosave.state,

      error:
        editorState.autosave?.error ??
        defaultEditorState.autosave.error,

      lastSavedAt: editorState.autosave?.lastSavedAt
        ? new Date(editorState.autosave.lastSavedAt)
        : null,

      lastAttemptAt: editorState.autosave?.lastAttemptAt
        ? new Date(editorState.autosave.lastAttemptAt)
        : null,
    },

    history: {
      canUndo:
        editorState.history?.canUndo ??
        defaultEditorState.history.canUndo,

      canRedo:
        editorState.history?.canRedo ??
        defaultEditorState.history.canRedo,

      index:
        editorState.history?.index ??
        defaultEditorState.history.index,

      size:
        editorState.history?.size ??
        defaultEditorState.history.size,
    },
  };
}




function mapQuestion(
  question: PrismaQuiz["questions"][number],
): Question {
  const base = {
    id: question.id,
    title: question.title,
    description: question.description ?? "",

    explanation: question.explanation ?? "",
    hint: question.hint ?? "",

    tags: question.tags ?? [],

    difficulty: question.difficulty ?? "MEDIUM",

    required: true,

    points: question.points,

    media: {
      image: question.imageUrl ?? undefined,
    },
  };

  switch (question.type) {
    case QuestionType.SINGLE_SELECT:
      return {
        ...base,
        type: QuestionType.SINGLE_SELECT,
        content: question.content as SingleSelectQuestion["content"],
        config: question.config as SingleSelectQuestion["config"],
      };

    case QuestionType.MULTIPLE_SELECT:
      return {
        ...base,
        type: QuestionType.MULTIPLE_SELECT,
        content: question.content as MultipleSelectQuestion["content"],
        config: question.config as MultipleSelectQuestion["config"],
      };

    case QuestionType.TRUE_FALSE:
      return {
        ...base,
        type: QuestionType.TRUE_FALSE,
        content: question.content as TrueFalseQuestion["content"],
        config: question.config as TrueFalseQuestion["config"],
      };

    case QuestionType.ORDERING:
      return {
        ...base,
        type: QuestionType.ORDERING,
        content: question.content as OrderingQuestion["content"],
        config: question.config as OrderingQuestion["config"],
      };

    case QuestionType.MATCH:
      return {
        ...base,
        type: QuestionType.MATCH,
        content: question.content as MatchQuestion["content"],
        config: question.config as MatchQuestion["config"],
      };

    case QuestionType.TYPE_ANSWER:
      return {
        ...base,
        type: QuestionType.TYPE_ANSWER,
        content: question.content as TypeAnswerQuestion["content"],
        config: question.config as TypeAnswerQuestion["config"],
      };

    case QuestionType.FILL_BLANK:
      return {
        ...base,
        type: QuestionType.FILL_BLANK,
        content: question.content as FillBlankQuestion["content"],
        config: question.config as FillBlankQuestion["config"],
      };

    case QuestionType.RANGE:
      return {
        ...base,
        type: QuestionType.RANGE,
        content: question.content as RangeQuestion["content"],
        config: question.config as RangeQuestion["config"],
      };

    case QuestionType.LOCATION:
      return {
        ...base,
        type: QuestionType.LOCATION,
        content: question.content as LocationQuestion["content"],
        config: question.config as LocationQuestion["config"],
      };

    case QuestionType.GUESS:
      return {
        ...base,
        type: QuestionType.GUESS,
        content: question.content as GuessQuestion["content"],
        config: question.config as GuessQuestion["config"],
      };

    case QuestionType.FLASHCARDS:
      return {
        ...base,
        type: QuestionType.FLASHCARDS,
        content: question.content as FlashcardsQuestion["content"],
        config: question.config as FlashcardsQuestion["config"],
      };

    case QuestionType.TAP_FIND:
      return {
        ...base,
        type: QuestionType.TAP_FIND,
        content: question.content as TapFindQuestion["content"],
        config: question.config as TapFindQuestion["config"],
      };

    case QuestionType.DROPDOWN:
      return {
        ...base,
        type: QuestionType.DROPDOWN,
        content: question.content as DropdownQuestion["content"],
        config: question.config as DropdownQuestion["config"],
      };
  }
}

export function mapQuiz(
  quiz: PrismaQuiz,
): QuizEditor {
  return {
    id: quiz.id,

    slug: quiz.slug ?? undefined,

    status: quiz.status,

    version: quiz.version,

    info: {
      title: quiz.title,
      description: quiz.description ?? "",

      thumbnail: quiz.thumbnail ?? undefined,

      tags: quiz.tags,

      language: quiz.language ?? "en",

      category: undefined,
    },

    appearance: mapAppearance(quiz.appearance),

    settings: mapSettings(
      quiz.settings,
      quiz.visibility,
    ),

    questions: [...quiz.questions]
      .sort((a, b) => a.order - b.order)
      .map(mapQuestion),
  };
}