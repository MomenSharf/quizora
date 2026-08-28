import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";
import { TextField } from "../fields/text-field";

type DropdownConfigProps = {
  questionIndex: number;
};

export function DropdownConfig({
  questionIndex,
}: DropdownConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-dropdown)",
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

          <ConfigSection title="Dropdown">
            <TextField
              control={control}
              name={`questions.${questionIndex}.config.placeholder`}
              label="Placeholder"
              description="Text shown when no option is selected."
              placeholder="Select an option..."
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.searchable`}
              label="Searchable"
              description="Allow players to search through the options."
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.clearable`}
              label="Clear selection"
              description="Allow players to remove their selected answer."
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