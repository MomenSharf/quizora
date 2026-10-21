
import QuestionImage from "./question-image";
import QuestionTitle from "./question-title";

export default function QuestionContainer() {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-6">
      <div className="order-1 min-w-0">
        <QuestionImage src="/assets/images/login-image.jpg" />
      </div>

      <div className="order-2 flex min-w-0 flex-col gap-4 sm:gap-5">
        <QuestionTitle
          questionNumber={1}
          title="Which planet is known as the Red Planet?
          Think about the planet's reddish appearance caused by iron oxide on its surface.
          Think about the planet's reddish appearance caused by iron oxide on its surface.
          Think about the planet's reddish appearance caused by iron oxide on its surface."
          description="Think about the planet's reddish appearance caused by iron oxide on its surface."
        />

        {/* Question content goes here */}
      </div>
    </div>
  );
}
