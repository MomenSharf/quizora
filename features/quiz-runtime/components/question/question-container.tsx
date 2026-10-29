import {
  useAnswerByQuestionId,
  useLockedQuestionIds,
  useRuntimePhase,
  useRuntimeQuestions,
} from "../../store";
import QuestionImage from "./question-image";
import QuestionTitle from "./question-title";
import QuestionMeta from "./question-meta";
import QuestionContentRouter from "./question-content-router";

export default function QuestionContainer() {
  const { currentQuestion, currentIndex } = useRuntimeQuestions();
  const phase = useRuntimePhase();
  const question = currentQuestion?.question;

  const answerState = useAnswerByQuestionId(question.id);
  const lockedQuestionsIds = useLockedQuestionIds();

  

  const isSubmitted =  answerState && answerState?.evaluation !== null;
  

  const isQuestionLocked = lockedQuestionsIds.includes(question.id);

  const isLocked =
    isQuestionLocked ||
    isSubmitted ||
    phase === "ANSWER_LOCKED" ||
    phase === "SUBMITTING" ||
    phase === "RESULT";

  if (!question) return null;

  const imageSrc = question.image?.url ?? "/assets/images/login-image.jpg";

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

      <div className="order-2 flex min-w-0 flex-col gap-3">
        <QuestionMeta type={question.type} />

        <QuestionTitle
          questionNumber={currentIndex + 1}
          title={question.title}
        />

        <QuestionContentRouter
          runtimeQuestion={currentQuestion}
          isLocked={isLocked}
          isSubmitted={isSubmitted}
        />
      </div>
    </div>
  );
}
