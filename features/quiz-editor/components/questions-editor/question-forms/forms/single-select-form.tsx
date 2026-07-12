import QuestionSection from "../question-section";

interface Props {
  questionId: string;
}

export function SingleSelectForm({ questionId }: Props) {
 

  return (
    <div className="">
     <QuestionSection questionId={questionId} />
    </div>
  );
}
