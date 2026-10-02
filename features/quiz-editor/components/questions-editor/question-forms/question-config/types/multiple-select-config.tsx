import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";

type MultipleSelectConfigProps = {
  questionIndex: number;
};

export function MultipleSelectConfig({
  questionIndex,
}: MultipleSelectConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-multiple)",
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

          <ConfigSection title="Options">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.shuffleOptions`}
              label="Shuffle options"
              description="Randomize the order of options for each attempt."
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.showOptionLetters`}
              label="Show option letters"
              description="Display A, B, C, and so on before each option."
            />

            <MediaConfig
              control={control}
              ratioName={`questions.${questionIndex}.config.optionMediaRatio`}
              showMediaName={`questions.${questionIndex}.config.showOptionMedia`}
              ratioLabel="Option media ratio"
              showMediaLabel="Show option media"
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />


          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Layout">
            <SelectField
              control={control}
              name={`questions.${questionIndex}.config.layout`}
              label="Option layout"
              description="Choose how the answer options are arranged."
              options={[
                { label: "Vertical", value: "VERTICAL" },
                { label: "Horizontal", value: "HORIZONTAL" },
                { label: "Grid", value: "GRID" },
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
