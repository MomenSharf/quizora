"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useRuntimeActions, useRuntimeCurrentQuestion } from "../../store";
import QuestionContentRouter from "./question-content-router";
import QuestionFeedback from "./question-feedback";
import QuestionImage from "./question-image";
import QuestionMeta from "./question-meta";
import QuestionResultFlash from "./question-result-flash";
import QuestionResultToast from "./question-result-toast";
import { QuestionStatusBar } from "./question-status-bar";
import QuestionTitle from "./question-title";


export default function GameplayQuestion() {
  const { runtimeCurrentQuestion, currentQuestionIndex } =
    useRuntimeCurrentQuestion();

  const { markFeedbackAsSeen } = useRuntimeActions();

  const {
    question,
    evaluation,
    locked: isLocked,
    hasSeenFeedback,
  } = runtimeCurrentQuestion;

  const {  clearAnswer } = useRuntimeActions();

  const isSubmitted = evaluation !== null;
  const isTimeout = evaluation?.outcome === "TIMEOUT";
  const shouldAnimateFeedback = !hasSeenFeedback;

  if (!question) return null;

  const showFeedback = isLocked && evaluation != null;

  const showResultAnimation =
    showFeedback && !runtimeCurrentQuestion.hasSeenFeedback;

  const imageSrc = question.image?.url ?? "/assets/images/login-image.jpg";

  const onAnimationComplete = () =>
    markFeedbackAsSeen(runtimeCurrentQuestion.id);

  const handleClear = () => {
    if (isLocked) return;
    clearAnswer(runtimeCurrentQuestion.id);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-5 px-2 py-3 sm:px-6 sm:py-7 lg:px-8 ${
          imageSrc
            ? "sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-6"
            : "mx-auto max-w-4xl"
        }`}
      >
        {imageSrc && (
          <div className="order-1 min-w-0">
            <QuestionImage src={imageSrc} />
          </div>
        )}

        <div className="relative isolate order-2 flex min-w-0 flex-col gap-4">
          {showResultAnimation && evaluation && (
            <>
              <QuestionResultFlash
                outcome={evaluation.outcome}
                onAnimationComplete={onAnimationComplete}
              />

              <QuestionResultToast outcome={evaluation.outcome} />
            </>
          )}

          <div className="relative z-10 flex min-w-0 flex-col gap-4">
            <QuestionMeta runtimeQuestion={runtimeCurrentQuestion} />

            <QuestionTitle
              questionNumber={currentQuestionIndex + 1}
              title={question.title}
            />
            <div className="flex flex-col gap-3 px-1">
              <QuestionStatusBar
                runtimeQuestion={runtimeCurrentQuestion}
                isLocked={isLocked}
                isTimeout={isTimeout}
                handleClear={handleClear}
              />
              <QuestionContentRouter
                runtimeQuestion={runtimeCurrentQuestion}
                isLocked={isLocked}
                isSubmitted={isSubmitted}
                isTimeout={isTimeout}
                shouldAnimateFeedback={shouldAnimateFeedback}
              />
            </div>

            {showFeedback && <QuestionFeedback evaluation={evaluation} />}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
