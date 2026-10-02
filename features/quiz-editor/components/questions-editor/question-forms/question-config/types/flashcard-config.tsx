import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { NumberField } from "../fields/number-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";

type FlashcardConfigProps = {
  questionIndex: number;
};

export function FlashcardConfig({
  questionIndex,
}: FlashcardConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-flashcard)",
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

          <ConfigSection title="Flip">
            <SelectField
              control={control}
              name={`questions.${questionIndex}.config.flipDirection`}
              label="Flip direction"
              description="Choose how the card flips between the front and back."
              options={[
                { label: "Horizontal", value: "HORIZONTAL" },
                { label: "Vertical", value: "VERTICAL" },
              ]}
            />

            <SelectField
              control={control}
              name={`questions.${questionIndex}.config.startSide`}
              label="Starting side"
              description="Choose which side is shown when the card opens."
              options={[
                { label: "Front", value: "FRONT" },
                { label: "Back", value: "BACK" },
              ]}
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.allowFlip`}
              label="Allow flipping"
              description="Allow the player to flip the card between both sides."
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Auto Flip">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.autoFlip`}
              label="Auto flip"
              description="Automatically flip the card after a delay."
            />

            <NumberField
              control={control}
              name={`questions.${questionIndex}.config.autoFlipDelay`}
              label="Flip delay"
              description="Time in milliseconds before the card automatically flips."
              min={0}
              step={100}
            />
          </ConfigSection>
        </div>
      </ConfigPanel>
    </div>
  );
}