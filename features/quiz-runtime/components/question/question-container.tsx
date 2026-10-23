import { useRuntimeQuestions } from "../../store";
import QuestionImage from "./question-image";
import QuestionTitle from "./question-title";
import QuestionMeta from "./question-meta";

export default function QuestionContainer() {
  const { currentQuestion, currentIndex } = useRuntimeQuestions();
  const question = currentQuestion?.question;

  if (!question) return null;

  const imageSrc = question.image?.url ?? '/assets/images/login-image.jpg';

  return (
    <div
      className={`grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-5 ${
        imageSrc
          ? "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-6"
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

        {/* Question content goes here */}
      </div>
    </div>
  );
}