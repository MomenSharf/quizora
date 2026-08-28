import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";
import { TextField } from "../fields/text-field";

type TrueFalseConfigProps = {
  questionIndex: number;
};

export function TrueFalseConfig({
  questionIndex,
}: TrueFalseConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-true-false)",
        } as React.CSSProperties
      }
    >
      <ConfigPanel>
        <div className="space-y-5">
          <BaseQuestionConfig questionIndex={questionIndex} />

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Media">
            <MediaConfig
              control={control}
              ratioName={`questions.${questionIndex}.config.mediaRatio`}
              showMediaName={`questions.${questionIndex}.config.showMedia`}
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Labels">
            <TextField
              control={control}
              name={`questions.${questionIndex}.config.trueLabel`}
              label="True label"
              description="Text displayed for the true answer."
              placeholder="True"
            />

            <TextField
              control={control}
              name={`questions.${questionIndex}.config.falseLabel`}
              label="False label"
              description="Text displayed for the false answer."
              placeholder="False"
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Options">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.shuffleOptions`}
              label="Shuffle options"
              description="Randomize the order of the two answers."
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Behavior">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.showExplanation`}
              label="Show explanation"
              description="Display the explanation after the player submits an answer."
            />
          </ConfigSection>
        </div>
      </ConfigPanel>
    </div>
  );
}