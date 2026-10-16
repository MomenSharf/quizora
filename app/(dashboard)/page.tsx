import { Button } from "@/components/ui/button";
import { DevelopmentStartQuizButton } from "@/features/quiz-runtime/components/development-start-quiz-button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p- min-h-screen">
     <DevelopmentStartQuizButton />
    </div>
  );
}
