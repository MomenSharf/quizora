
import { useRuntimeCurrentQuestion } from "../../store";
import QuestionContentRouter from "./question-content-router";
import QuestionFeedback from "./question-feedback";
import QuestionImage from "./question-image";
import QuestionMeta from "./question-meta";
import QuestionTitle from "./question-title";

export default function QuestionContainer() {
  const { runtimeCurrentQuestion, currentQuestionIndex } =
    useRuntimeCurrentQuestion();

  const { question, evaluation, locked } = runtimeCurrentQuestion;

  if (!question) return null;

  const showFeedback = locked && evaluation != null;
  const imageSrc = question.image?.url;

  return (
    <div
      className={`grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-5 ${
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

      <div className="order-2 flex min-w-0 flex-col gap-4">
        <QuestionMeta type={question.type} />

        <QuestionTitle
          questionNumber={currentQuestionIndex + 1}
          title={question.title}
        />

        <QuestionContentRouter runtimeQuestion={runtimeCurrentQuestion} />

        {showFeedback && (
          <QuestionFeedback
            evaluation={evaluation}
            explanation={question.explanation ?? 'test'}
          />
        )}
      </div>
    </div>
  );
}
