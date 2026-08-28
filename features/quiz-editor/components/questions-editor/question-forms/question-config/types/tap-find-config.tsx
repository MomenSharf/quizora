import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SwitchField } from "../fields/switch-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";

type TapFindConfigProps = {
  questionIndex: number;
};

export function TapFindConfig({ questionIndex }: TapFindConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-tap-find)",
        } as React.CSSProperties
      }
    >
      <ConfigPanel>
        <div className="space-y-5">
          <BaseQuestionConfig questionIndex={questionIndex} />

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Behavior">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.showExplanation`}
              label="Show explanation"
              description="Display the explanation after the player completes the question."
            />
          </ConfigSection>
        </div>
      </ConfigPanel>
    </div>
  );
}