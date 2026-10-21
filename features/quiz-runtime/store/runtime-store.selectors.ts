"use client";

import { useShallow } from "zustand/react/shallow";

import { useRuntimeStore } from "./runtime-store";

export const useRuntime = () =>
  useRuntimeStore(
    useShallow((state) => ({
      attemptId: state.attemptId,
      quizId: state.quizId,
      quizTitle: state.quizTitle,
      environment: state.environment,
      mode: state.mode,
      settings: state.settings,
      status: state.status,
      phase: state.phase,
      startedAt: state.startedAt,
      lastActivityAt: state.lastActivityAt,
      pausedAt: state.pausedAt,
      completedAt: state.completedAt,
      expiresAt: state.expiresAt,
    })),
  );

export const useRuntimeQuestions = () =>
  useRuntimeStore(
    useShallow((state) => {
      const { questions, questionState } = state;
      const { currentIndex } = questionState;
      const currentQuestion = questions[currentIndex] ?? null;
      const totalQuestions = questions.length;

      return {
        questions,
        currentQuestion,
        currentQuestionId: currentQuestion?.id ?? null,
        currentIndex,
        totalQuestions,
        isFirstQuestion: totalQuestions > 0 && currentIndex === 0,
        isLastQuestion:
          totalQuestions > 0 && currentIndex === totalQuestions - 1,
        hasPreviousQuestion: currentIndex > 0,
        hasNextQuestion: currentIndex < totalQuestions - 1,
        visitedQuestionIds: questionState.visitedQuestionIds,
        flaggedQuestionIds: questionState.flaggedQuestionIds,
        lockedQuestionIds: questionState.lockedQuestionIds,
      };
    }),
  );

export const useRuntimeAnswers = () =>
  useRuntimeStore((state) => state.answers);

export const useCurrentAnswer = () =>
  useRuntimeStore((state) => {
    const currentQuestion = state.questions[state.questionState.currentIndex];

    return currentQuestion ? (state.answers[currentQuestion.id] ?? null) : null;
  });

export const useAnswerByQuestionId = (questionId: string) =>
  useRuntimeStore((state) => state.answers[questionId] ?? null);

export const useQuestionById = (questionId: string) =>
  useRuntimeStore(
    (state) =>
      state.questions.find((question) => question.id === questionId) ?? null,
  );

export const useRuntimeProgress = () =>
  useRuntimeStore((state) => state.progress);

export const useRuntimeTimer = () => useRuntimeStore((state) => state.timer);

export const useRuntimeFeedback = () =>
  useRuntimeStore((state) => state.feedback);

export const useRuntimeSubmission = () =>
  useRuntimeStore((state) => state.submission);

export const useRuntimePersistence = () =>
  useRuntimeStore((state) => state.persistence);

export const useRuntimeLoading = () =>
  useRuntimeStore((state) => state.loading);

export const useRuntimeError = () => useRuntimeStore((state) => state.error);

export const useRuntimeQuestionState = () =>
  useRuntimeStore((state) => state.questionState);

export const useAttemptId = () => useRuntimeStore((state) => state.attemptId);

export const useQuizId = () => useRuntimeStore((state) => state.quizId);

export const useRuntimeEnvironment = () =>
  useRuntimeStore((state) => state.environment);

export const useSessionMode = () => useRuntimeStore((state) => state.mode);

export const useAttemptSettings = () =>
  useRuntimeStore((state) => state.settings);

export const useRuntimeStatus = () => useRuntimeStore((state) => state.status);

export const useRuntimePhase = () => useRuntimeStore((state) => state.phase);

export const useCurrentQuestionIndex = () =>
  useRuntimeStore((state) => state.questionState.currentIndex);

export const useCurrentQuestion = () =>
  useRuntimeStore(
    (state) => state.questions[state.questionState.currentIndex] ?? null,
  );

export const useCurrentQuestionId = () =>
  useRuntimeStore(
    (state) => state.questions[state.questionState.currentIndex]?.id ?? null,
  );

export const useVisitedQuestionIds = () =>
  useRuntimeStore((state) => state.questionState.visitedQuestionIds);

export const useFlaggedQuestionIds = () =>
  useRuntimeStore((state) => state.questionState.flaggedQuestionIds);

export const useLockedQuestionIds = () =>
  useRuntimeStore((state) => state.questionState.lockedQuestionIds);

export const useIsQuestionFlagged = (questionId: string) =>
  useRuntimeStore((state) =>
    state.questionState.flaggedQuestionIds.includes(questionId),
  );

export const useIsQuestionLocked = (questionId: string) =>
  useRuntimeStore((state) =>
    state.questionState.lockedQuestionIds.includes(questionId),
  );

export const useIsFirstQuestion = () =>
  useRuntimeStore(
    (state) =>
      state.questions.length > 0 && state.questionState.currentIndex === 0,
  );

export const useIsLastQuestion = () =>
  useRuntimeStore(
    (state) =>
      state.questions.length > 0 &&
      state.questionState.currentIndex === state.questions.length - 1,
  );

export const useHasPreviousQuestion = () =>
  useRuntimeStore((state) => state.questionState.currentIndex > 0);

export const useHasNextQuestion = () =>
  useRuntimeStore(
    (state) => state.questionState.currentIndex < state.questions.length - 1,
  );

export const useAnsweredQuestions = () =>
  useRuntimeStore((state) => state.progress.answeredQuestions);

export const useCorrectAnswers = () =>
  useRuntimeStore((state) => state.progress.correctAnswers);

export const useSkippedQuestions = () =>
  useRuntimeStore((state) => state.progress.skippedQuestions);

export const useRuntimeScore = () =>
  useRuntimeStore((state) => state.progress.score);

export const useRuntimeTotalPoints = () =>
  useRuntimeStore((state) => state.progress.totalPoints);

export const useRuntimeElapsedSeconds = () =>
  useRuntimeStore((state) => state.progress.elapsedSeconds);

export const useRuntimeRemainingSeconds = () =>
  useRuntimeStore((state) => state.progress.remainingSeconds);

export const useIsQuestionTimerRunning = () =>
  useRuntimeStore((state) => state.timer.isQuestionTimerRunning);

export const useIsAttemptTimerRunning = () =>
  useRuntimeStore((state) => state.timer.isAttemptTimerRunning);

export const useQuestionDeadlineAt = () =>
  useRuntimeStore((state) => state.timer.questionDeadlineAt);

export const useAttemptDeadlineAt = () =>
  useRuntimeStore((state) => state.timer.attemptDeadlineAt);

export const useIsFeedbackVisible = () =>
  useRuntimeStore((state) => state.feedback.visible);

export const useFeedbackEvaluation = () =>
  useRuntimeStore((state) => state.feedback.evaluation);

export const useFeedbackQuestionId = () =>
  useRuntimeStore((state) => state.feedback.questionId);

export const useIsSubmitting = () =>
  useRuntimeStore((state) => state.submission.isSubmitting);

export const useIsSubmitConfirmed = () =>
  useRuntimeStore((state) => state.submission.isConfirmed);

export const useUnansweredQuestionIds = () =>
  useRuntimeStore((state) => state.submission.unansweredQuestionIds);

export const useSubmittedAt = () =>
  useRuntimeStore((state) => state.submission.submittedAt);

export const useRuntimeSaveState = () =>
  useRuntimeStore((state) => state.persistence.saveState);

export const useRuntimeSaveError = () =>
  useRuntimeStore((state) => state.persistence.error);

export const useRuntimeDirty = () =>
  useRuntimeStore((state) => state.persistence.dirty);

export const useRuntimeLastSavedAt = () =>
  useRuntimeStore((state) => state.persistence.lastSavedAt);

export const useRuntimeLastAttemptAt = () =>
  useRuntimeStore((state) => state.persistence.lastAttemptAt);

export const useIsRuntimeLoading = () =>
  useRuntimeStore((state) => state.loading.isLoading);

export const useIsStartingAttempt = () =>
  useRuntimeStore((state) => state.loading.isStarting);

export const useIsPausingAttempt = () =>
  useRuntimeStore((state) => state.loading.isPausing);

export const useIsResumingAttempt = () =>
  useRuntimeStore((state) => state.loading.isResuming);

export const useIsCompletingAttempt = () =>
  useRuntimeStore((state) => state.loading.isCompleting);

export const useIsLeavingRuntime = () =>
  useRuntimeStore((state) => state.loading.isLeaving);

export const useRuntimeActions = () =>
  useRuntimeStore(
    useShallow((state) => ({
      initializeAttempt: state.initializeAttempt,
      hydrateAttempt: state.hydrateAttempt,
      clearAttempt: state.clearAttempt,

      setEnvironment: state.setEnvironment,
      setMode: state.setMode,
      setSettings: state.setSettings,

      setStatus: state.setStatus,
      setPhase: state.setPhase,
      startAttempt: state.startAttempt,
      pauseAttempt: state.pauseAttempt,
      resumeAttempt: state.resumeAttempt,
      completeAttempt: state.completeAttempt,
      abandonAttempt: state.abandonAttempt,
      updateLastActivity: state.updateLastActivity,

      setQuestions: state.setQuestions,
      setCurrentQuestion: state.setCurrentQuestion,
      goToNextQuestion: state.goToNextQuestion,
      goToPreviousQuestion: state.goToPreviousQuestion,
      goToQuestion: state.goToQuestion,
      markQuestionVisited: state.markQuestionVisited,
      toggleQuestionFlag: state.toggleQuestionFlag,
      lockQuestion: state.lockQuestion,
      unlockQuestion: state.unlockQuestion,

      setAnswer: state.setAnswer,
      clearAnswer: state.clearAnswer,
      setAnswerEvaluation: state.setAnswerEvaluation,
      setAnswerState: state.setAnswerState,
      markAnswerSaved: state.markAnswerSaved,

      setQuestionStatus: state.setQuestionStatus,
      setQuestionTimeSpent: state.setQuestionTimeSpent,
      setProgress: state.setProgress,
      recalculateProgress: state.recalculateProgress,

      setTimer: state.setTimer,
      startQuestionTimer: state.startQuestionTimer,
      stopQuestionTimer: state.stopQuestionTimer,
      setAttemptDeadline: state.setAttemptDeadline,

      showFeedback: state.showFeedback,
      hideFeedback: state.hideFeedback,
      clearFeedback: state.clearFeedback,

      setSubmitting: state.setSubmitting,
      setSubmitConfirmation: state.setSubmitConfirmation,
      setUnansweredQuestions: state.setUnansweredQuestions,
      setSubmittedAt: state.setSubmittedAt,

      setSaveState: state.setSaveState,
      setSaveError: state.setSaveError,
      setDirty: state.setDirty,
      setLastSavedAt: state.setLastSavedAt,
      setLastAttemptAt: state.setLastAttemptAt,
      markAllAnswersSaved: state.markAllAnswersSaved,

      setLoadingState: state.setLoadingState,
      setError: state.setError,
      clearError: state.clearError,

      resetQuestionState: state.resetQuestionState,
      resetSubmission: state.resetSubmission,
      reset: state.reset,
    })),
  );
