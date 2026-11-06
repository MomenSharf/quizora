import { Prisma, QuestionType } from "@/lib/db/generated/prisma/client";

import {
  DropdownQuestion,
  FillBlankQuestion,
  FlashcardQuestion,
  GuessQuestion,
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
import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";

import { defaultEditorState, type EditorState } from "../store";
import { MediaRatio } from "../validation/image";

type PrismaQuiz = Prisma.QuizGetPayload<{
  include: {
    questions: {
      include: {
        image: true;
        explanationImage: true;
      };
    };
    thumbnail: true;
  };
}>;

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

      isQuestionSelectorOpen:
        editorState.navigation?.isQuestionSelectorOpen ??
        defaultEditorState.navigation.isQuestionSelectorOpen,
    },

    validation: {
      attempted: editorState.validation?.attempted ?? false,
      isValidating: editorState.validation?.isValidating ?? false,
      lastValidatedAt: editorState.validation?.lastValidatedAt ?? null,
      errorCount: editorState.validation?.errorCount ?? 0,
      firstErrorPath: editorState.validation?.firstErrorPath ?? null,
    },

    autosave: {
      enabled:
        editorState.autosave?.enabled ?? defaultEditorState.autosave.enabled,

      dirty: editorState.autosave?.dirty ?? defaultEditorState.autosave.dirty,

      state: editorState.autosave?.state ?? defaultEditorState.autosave.state,

      error: editorState.autosave?.error ?? defaultEditorState.autosave.error,

      lastSavedAt: editorState.autosave?.lastSavedAt
        ? new Date(editorState.autosave.lastSavedAt)
        : null,

      lastAttemptAt: editorState.autosave?.lastAttemptAt
        ? new Date(editorState.autosave.lastAttemptAt)
        : null,
    },

    history: {
      canUndo:
        editorState.history?.canUndo ?? defaultEditorState.history.canUndo,

      canRedo:
        editorState.history?.canRedo ?? defaultEditorState.history.canRedo,

      index: editorState.history?.index ?? defaultEditorState.history.index,

      size: editorState.history?.size ?? defaultEditorState.history.size,
    },
  };
}

function mapQuestion(question: PrismaQuiz["questions"][number]): Question {
  const base = {
    id: question.id,
    title: question.title,

    explanation: question.explanation ?? "",

    explanationImage: question.explanationImage
      ? {
          id: question.explanationImage.id,
          key: question.explanationImage.key,
          alt: question.explanationImage.alt,
          caption: question.explanationImage.caption ?? undefined,
          ratio: question.explanationImage.ratio as MediaRatio,
          url: question.explanationImage.url,
        }
      : undefined,

    points: question.points,

    image: question.image
      ? {
          id: question.image.id,
          key: question.image.key,
          alt: question.image.alt,
          caption: question.image.caption ?? undefined,
          ratio: question.image.ratio as MediaRatio,
          url: question.image.url,
        }
      : undefined,
  };

  switch (question.type) {
    case QuestionType.SINGLE_SELECT:
      return {
        ...base,
        type: QuestionType.SINGLE_SELECT,
        content: question.content as SingleSelectQuestion["content"],
      };

    case QuestionType.MULTIPLE_SELECT:
      return {
        ...base,
        type: QuestionType.MULTIPLE_SELECT,
        content: question.content as MultipleSelectQuestion["content"],
      };

    case QuestionType.TRUE_FALSE:
      return {
        ...base,
        type: QuestionType.TRUE_FALSE,
        content: question.content as TrueFalseQuestion["content"],
      };

    case QuestionType.ORDERING:
      return {
        ...base,
        type: QuestionType.ORDERING,
        content: question.content as OrderingQuestion["content"],
      };

    case QuestionType.MATCH:
      return {
        ...base,
        type: QuestionType.MATCH,
        content: question.content as MatchQuestion["content"],
      };

    case QuestionType.TYPE_ANSWER:
      return {
        ...base,
        type: QuestionType.TYPE_ANSWER,
        content: question.content as TypeAnswerQuestion["content"],
      };

    case QuestionType.FILL_BLANK:
      return {
        ...base,
        type: QuestionType.FILL_BLANK,
        content: question.content as FillBlankQuestion["content"],
      };

    case QuestionType.RANGE:
      return {
        ...base,
        type: QuestionType.RANGE,
        content: question.content as RangeQuestion["content"],
      };

    case QuestionType.GUESS:
      return {
        ...base,
        type: QuestionType.GUESS,
        content: question.content as GuessQuestion["content"],
      };

    case QuestionType.FLASHCARD:
      return {
        ...base,
        type: QuestionType.FLASHCARD,
        content: question.content as FlashcardQuestion["content"],
      };

    case QuestionType.TAP_FIND:
      return {
        ...base,
        type: QuestionType.TAP_FIND,
        content: question.content as TapFindQuestion["content"],
      };

    case QuestionType.DROPDOWN:
      return {
        ...base,
        type: QuestionType.DROPDOWN,
        content: question.content as DropdownQuestion["content"],
      };
  }
}

export function mapQuiz(quiz: PrismaQuiz): QuizEditor {
  return {
    id: quiz.id,

    slug: quiz.slug ?? undefined,

    title: quiz.title,
    description: quiz.description ?? undefined ,

    thumbnail: quiz.thumbnail
      ? {
          key: quiz.thumbnail.key,
          id: quiz.thumbnail.id,
          url: quiz.thumbnail.url,
          alt: quiz.thumbnail.alt,
          caption: quiz.thumbnail.caption ?? undefined,
          ratio: quiz.thumbnail.ratio as MediaRatio,
        }
      : undefined,

    language: quiz.language,

    category: quiz.category ?? undefined,

    visibility: quiz.visibility,

    tags: quiz.tags,

    questions: [...quiz.questions]
      .sort((a, b) => a.order - b.order)
      .map(mapQuestion),
  };
}
