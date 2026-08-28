import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";

type OrderingConfigProps = {
  questionIndex: number;
};

export function OrderingConfig({
  questionIndex,
}: OrderingConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-ordering)",
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

          <ConfigSection title="Items">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.shuffleItems`}
              label="Shuffle items"
              description="Randomize the starting order of items for each attempt."
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.showNumbers`}
              label="Show numbers"
              description="Display the position number next to each item."
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Layout">
            <SelectField
              control={control}
              name={`questions.${questionIndex}.config.layout`}
              label="Item layout"
              description="Choose how the ordering items are arranged."
              options={[
                { label: "Vertical", value: "VERTICAL" },
                { label: "Horizontal", value: "HORIZONTAL" },
              ]}
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