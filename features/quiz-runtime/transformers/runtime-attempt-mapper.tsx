import {
  Difficulty,
  Prisma,
  QuestionType,
  type AttemptQuestion,
} from "@/lib/db/generated/prisma/client";
import {
  DropdownQuestion,
  FillBlankQuestion,
  FlashcardQuestion,
  GuessQuestion,
  MatchQuestion,
  MultipleSelectQuestion,
  OrderingQuestion,
  RangeQuestion,
  SingleSelectQuestion,
  TapFindQuestion,
  TrueFalseQuestion,
  TypeAnswerQuestion,
} from "@/features/quiz-editor/validation/question";
import type {
  QuizAttemptRuntime,
  RuntimeQuestion,
} from "../types/runtime-types";
import type { Answer } from "../types/answer-types";
import type { EvaluationResult } from "../types/evaluation-types";
import { ImageData } from "@/features/quiz-editor/validation/image";

export type PrismaQuizAttempt = Prisma.QuizAttemptGetPayload<{
  include: {
    questions: true;
    quiz: {
      include: {
        thumbnail: true;
      };
    };
  };
}>;

const DEFAULT_SETTINGS: QuizAttemptRuntime["settings"] = {
  version: 1,
  mode: "PRACTICE",
  navigation: "SEQUENTIAL",
  allowSkip: true,
  allowQuestionRetry: false,
  allowAnswerChange: true,
  questionTimerEnabled: false,
  defaultQuestionTimeLimit: null,
  totalTimerEnabled: false,
  totalTimeLimitSeconds: null,
  resultVisibility: "IMMEDIATE",
  scoreVisibility: "ALWAYS",
  showExplanations: true,
  shuffleQuestions: false,
  shuffleAnswers: false,
};

const DEFAULT_EVALUATION: EvaluationResult = {
  status: "PENDING",
  outcome: "UNANSWERED",
  isCorrect: null,
  earnedPoints: 0,
  maxPoints: 0,
  accuracy: null,
  feedback: null,
  explanation: null,
  parts: [],
  evaluatedAt: null,
  visibility: {
    showCorrectAnswer: false,
    showExplanation: false,
    showFeedback: false,
    showEarnedPoints: false,
  },
};

function getSettings(value: Prisma.JsonValue): QuizAttemptRuntime["settings"] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return DEFAULT_SETTINGS;
  }

  const settings = value as Record<string, Prisma.JsonValue>;

  return {
    ...DEFAULT_SETTINGS,
    version: 1,
    mode: settings.mode === "TEST" ? "TEST" : "PRACTICE",
    navigation: settings.navigation === "FREE" ? "FREE" : "SEQUENTIAL",
    allowSkip:
      typeof settings.allowSkip === "boolean"
        ? settings.allowSkip
        : DEFAULT_SETTINGS.allowSkip,
    allowQuestionRetry:
      typeof settings.allowQuestionRetry === "boolean"
        ? settings.allowQuestionRetry
        : DEFAULT_SETTINGS.allowQuestionRetry,
    allowAnswerChange:
      typeof settings.allowAnswerChange === "boolean"
        ? settings.allowAnswerChange
        : DEFAULT_SETTINGS.allowAnswerChange,
    questionTimerEnabled:
      typeof settings.questionTimerEnabled === "boolean"
        ? settings.questionTimerEnabled
        : DEFAULT_SETTINGS.questionTimerEnabled,
    defaultQuestionTimeLimit:
      typeof settings.defaultQuestionTimeLimit === "number"
        ? settings.defaultQuestionTimeLimit
        : null,
    totalTimerEnabled:
      typeof settings.totalTimerEnabled === "boolean"
        ? settings.totalTimerEnabled
        : DEFAULT_SETTINGS.totalTimerEnabled,
    totalTimeLimitSeconds:
      typeof settings.totalTimeLimitSeconds === "number"
        ? settings.totalTimeLimitSeconds
        : null,
    resultVisibility:
      settings.resultVisibility === "AFTER_SUBMISSION" ||
      settings.resultVisibility === "HIDDEN"
        ? settings.resultVisibility
        : settings.resultVisibility === "IMMEDIATE"
          ? "IMMEDIATE"
          : DEFAULT_SETTINGS.resultVisibility,
    scoreVisibility:
      settings.scoreVisibility === "AFTER_QUESTION" ||
      settings.scoreVisibility === "AFTER_SUBMISSION" ||
      settings.scoreVisibility === "HIDDEN"
        ? settings.scoreVisibility
        : settings.scoreVisibility === "ALWAYS"
          ? "ALWAYS"
          : DEFAULT_SETTINGS.scoreVisibility,
    showExplanations:
      typeof settings.showExplanations === "boolean"
        ? settings.showExplanations
        : DEFAULT_SETTINGS.showExplanations,
    shuffleQuestions:
      typeof settings.shuffleQuestions === "boolean"
        ? settings.shuffleQuestions
        : DEFAULT_SETTINGS.shuffleQuestions,
    shuffleAnswers:
      typeof settings.shuffleAnswers === "boolean"
        ? settings.shuffleAnswers
        : DEFAULT_SETTINGS.shuffleAnswers,
  };
}

function getAnswer(value: Prisma.JsonValue | null): Answer | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  if (
    typeof value.questionId !== "string" ||
    typeof value.type !== "string" ||
    typeof value.answeredAt !== "number" ||
    typeof value.timeSpentSeconds !== "number"
  ) {
    return null;
  }

  switch (value.type) {
    case "SINGLE_SELECT":
      return typeof value.optionId === "string"
        ? {
            type: "SINGLE_SELECT",
            questionId: value.questionId,
            answeredAt: value.answeredAt,
            timeSpentSeconds: value.timeSpentSeconds,
            optionId: value.optionId,
          }
        : null;

    case "MULTIPLE_SELECT":
      return Array.isArray(value.optionIds) &&
        value.optionIds.every((id) => typeof id === "string")
        ? {
            type: "MULTIPLE_SELECT",
            questionId: value.questionId,
            answeredAt: value.answeredAt,
            timeSpentSeconds: value.timeSpentSeconds,
            optionIds: value.optionIds,
          }
        : null;

    case "TRUE_FALSE":
      return typeof value.value === "boolean"
        ? {
            type: "TRUE_FALSE",
            questionId: value.questionId,
            answeredAt: value.answeredAt,
            timeSpentSeconds: value.timeSpentSeconds,
            value: value.value,
          }
        : null;

    case "TYPE_ANSWER":
      return typeof value.value === "string"
        ? {
            type: "TYPE_ANSWER",
            questionId: value.questionId,
            answeredAt: value.answeredAt,
            timeSpentSeconds: value.timeSpentSeconds,
            value: value.value,
          }
        : null;

    case "RANGE":
    case "GUESS":
      return typeof value.value === "number"
        ? {
            type: value.type,
            questionId: value.questionId,
            answeredAt: value.answeredAt,
            timeSpentSeconds: value.timeSpentSeconds,
            value: value.value,
          }
        : null;

    // !!! TODO: Handle other types
    default:
      return null;
  }
}

function getEvaluation(
  value: Prisma.JsonValue | null,
): EvaluationResult | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  if (typeof value.status !== "string" || typeof value.outcome !== "string") {
    return null;
  }

  return {
    ...DEFAULT_EVALUATION,
    status:
      value.status === "EVALUATED" || value.status === "NOT_GRADED"
        ? value.status
        : "PENDING",
    outcome:
      value.outcome === "CORRECT" ||
      value.outcome === "PARTIALLY_CORRECT" ||
      value.outcome === "INCORRECT" ||
      value.outcome === "NOT_APPLICABLE"
        ? value.outcome
        : "UNANSWERED",
    isCorrect: typeof value.isCorrect === "boolean" ? value.isCorrect : null,
    earnedPoints:
      typeof value.earnedPoints === "number" ? value.earnedPoints : 0,
    maxPoints: typeof value.maxPoints === "number" ? value.maxPoints : 0,
    accuracy: typeof value.accuracy === "number" ? value.accuracy : null,
    feedback: typeof value.feedback === "string" ? value.feedback : null,
    explanation:
      typeof value.explanation === "string" ? value.explanation : null,
    parts: [],
    evaluatedAt:
      typeof value.evaluatedAt === "number" ? value.evaluatedAt : null,
    visibility: DEFAULT_EVALUATION.visibility,
  };
}

// function getQuestionSnapshot(
//   value: Prisma.JsonValue,
// ): RuntimeQuestion["question"] {
//   if (!value || typeof value !== "object" || Array.isArray(value)) {
//     throw new Error("Invalid question snapshot");
//   }

//   const snapshot = value as Record<string, Prisma.JsonValue>;

//   if (typeof snapshot.id !== "string" || typeof snapshot.title !== "string") {
//     throw new Error("Question snapshot is missing required fields");
//   }

//   return {
//     id: snapshot.id,
//     quizId: typeof snapshot.quizId === "string" ? snapshot.quizId : "",
//     type: snapshot.type as RuntimeQuestion["question"]["type"],
//     title: snapshot.title,
//     explanation:
//       typeof snapshot.explanation === "string" ? snapshot.explanation : null,
//     points: typeof snapshot.points === "number" ? snapshot.points : 1,
//     order: typeof snapshot.order === "number" ? snapshot.order : 0,
//     imageId: typeof snapshot.imageid === "string" ? snapshot.imageid : null,
//     image: null,
//     tags: Array.isArray(snapshot.tags)
//       ? snapshot.tags.filter((tag): tag is string => typeof tag === "string")
//       : ["general"],
//     difficulty:
//       snapshot.difficulty === "EASY" || snapshot.difficulty === "HARD"
//         ? snapshot.difficulty
//         : "MEDIUM",
//     content: snapshot.content ?? {},
//     config: snapshot.config ?? {},
//     version: typeof snapshot.version === "number" ? snapshot.version : 1,
//     createdAt: new Date(0),
//     updatedAt: new Date(0),
//   };
// }
function getQuestionSnapshot(
  value: Prisma.JsonValue,
): RuntimeQuestion["question"] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid question snapshot");
  }

  const snapshot = value as Record<string, Prisma.JsonValue>;

  if (typeof snapshot.id !== "string" || typeof snapshot.title !== "string") {
    throw new Error("Question snapshot is missing required fields");
  }

  const questionImage = snapshot.image as ImageData | undefined;
  console.log("snapp" ,snapshot.title);
  

  const base = {
    id: snapshot.id,
    title: snapshot.title,
    explanation:
      typeof snapshot.explanation === "string"
        ? snapshot.explanation
        : undefined,
    tags: Array.isArray(snapshot.tags)
      ? snapshot.tags.filter((tag): tag is string => typeof tag === "string")
      : ["general"],
    difficulty:
      snapshot.difficulty === "EASY" || snapshot.difficulty === "HARD"
        ? (snapshot.difficulty as Difficulty)
        : ("MEDIUM" as Difficulty),

    image: questionImage?.url ? questionImage : undefined,
  };

  switch (snapshot.type as QuestionType) {
    case QuestionType.SINGLE_SELECT:
      return {
        ...base,
        type: QuestionType.SINGLE_SELECT,
        config: snapshot.config as SingleSelectQuestion["config"],
        content: snapshot.content as SingleSelectQuestion["content"],
      };

    case QuestionType.MULTIPLE_SELECT:
      return {
        ...base,
        type: QuestionType.MULTIPLE_SELECT,
        content: snapshot.content as MultipleSelectQuestion["content"],
        config: snapshot.config as MultipleSelectQuestion["config"],
      };

    case QuestionType.TRUE_FALSE:
      return {
        ...base,
        type: QuestionType.TRUE_FALSE,
        content: snapshot.content as TrueFalseQuestion["content"],
        config: snapshot.config as TrueFalseQuestion["config"],
      };

    case QuestionType.ORDERING:
      return {
        ...base,
        type: QuestionType.ORDERING,
        content: snapshot.content as OrderingQuestion["content"],
        config: snapshot.config as OrderingQuestion["config"],
      };

    case QuestionType.MATCH:
      return {
        ...base,
        type: QuestionType.MATCH,
        content: snapshot.content as MatchQuestion["content"],
        config: snapshot.config as MatchQuestion["config"],
      };

    case QuestionType.TYPE_ANSWER:
      return {
        ...base,
        type: QuestionType.TYPE_ANSWER,
        content: snapshot.content as TypeAnswerQuestion["content"],
        config: snapshot.config as TypeAnswerQuestion["config"],
      };

    case QuestionType.FILL_BLANK:
      return {
        ...base,
        type: QuestionType.FILL_BLANK,
        content: snapshot.content as FillBlankQuestion["content"],
        config: snapshot.config as FillBlankQuestion["config"],
      };

    case QuestionType.RANGE:
      return {
        ...base,
        type: QuestionType.RANGE,
        content: snapshot.content as RangeQuestion["content"],
        config: snapshot.config as RangeQuestion["config"],
      };

    case QuestionType.GUESS:
      return {
        ...base,
        type: QuestionType.GUESS,
        content: snapshot.content as GuessQuestion["content"],
        config: snapshot.config as GuessQuestion["config"],
      };

    case QuestionType.FLASHCARD:
      return {
        ...base,
        type: QuestionType.FLASHCARD,
        content: snapshot.content as FlashcardQuestion["content"],
        config: snapshot.config as FlashcardQuestion["config"],
      };

    case QuestionType.TAP_FIND:
      return {
        ...base,
        type: QuestionType.TAP_FIND,
        content: snapshot.content as TapFindQuestion["content"],
        config: snapshot.config as TapFindQuestion["config"],
      };

    case QuestionType.DROPDOWN:
      return {
        ...base,
        type: QuestionType.DROPDOWN,
        content: snapshot.content as DropdownQuestion["content"],
        config: snapshot.config as DropdownQuestion["config"],
      };

    default:
      throw new Error(`Unsupported question type: ${snapshot.type}`);
  }
}

function mapQuestion(
  question: PrismaQuizAttempt["questions"][number],
): RuntimeQuestion {
  return {
    id: question.id,
    questionId: question.questionId,
    orderIndex: question.orderIndex,
    question: getQuestionSnapshot(question.questionSnapshot),
    status: question.status,
    answer: getAnswer(question.response),
    evaluation: getEvaluation(question.evaluation),
    earnedPoints: question.earnedPoints,
    maxPoints: question.maxPoints,
    timeSpentSeconds: question.timeSpentSeconds,
    answeredAt: question.answeredAt?.getTime() ?? null,
  };
}

export function mapQuizAttempt(attempt: PrismaQuizAttempt): QuizAttemptRuntime {
  const settings = getSettings(attempt.settings);

  const questions = [...attempt.questions]
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map(mapQuestion);

  const remainingSeconds =
    settings.totalTimerEnabled && settings.totalTimeLimitSeconds !== null
      ? Math.max(0, settings.totalTimeLimitSeconds - attempt.elapsedSeconds)
      : null;

  return {
    id: attempt.id,
    quizId: attempt.quizId,
    quizTitle: attempt.quizTitle,
    quizDescription: attempt.quizDescription,
    environment: attempt.environment,
    settings,
    status: attempt.status,
    phase: attempt.phase || 'READY',
    questions,
    progress: {
      currentQuestionIndex: attempt.currentQuestionIndex,
      totalQuestions: attempt.totalQuestions,
      answeredQuestions: attempt.answeredQuestions,
      correctAnswers: attempt.correctAnswers,
      skippedQuestions: questions.filter(
        (question) => question.status === "SKIPPED",
      ).length,
      score: attempt.score,
      totalPoints: attempt.totalPoints,
      elapsedSeconds: attempt.elapsedSeconds,
      remainingSeconds,
    },
    timer: {
      questionStartedAt: null,
      questionDeadlineAt: null,
      attemptDeadlineAt: attempt.expiresAt?.getTime() ?? null,
      isQuestionTimerRunning: false,
      isAttemptTimerRunning: false,
    },
    startedAt: attempt.startedAt.getTime(),
    lastActivityAt: attempt.lastActivityAt.getTime(),
    pausedAt: attempt.pausedAt?.getTime() ?? null,
    completedAt: attempt.completedAt?.getTime() ?? null,
    expiresAt: attempt.expiresAt?.getTime() ?? null,
    saveStatus: "SAVED",
  };
}
