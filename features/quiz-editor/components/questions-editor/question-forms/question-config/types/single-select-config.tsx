import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";

export function SingleSelectConfig({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const { control, getValues } = useQuizForm();

  console.log(getValues(`questions.${questionIndex}.config.timeLimit`));
  

  return (
    <div
      style={
        {
          "--primary": `var(--question-single)`,
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
              ratioName={`questions.${questionIndex}.image.ratio`}
              showMediaName={`questions.${questionIndex}.config.showMedia`}
              
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Options">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.suffleOptions`}
              label="Shuffle options"
              description="Shuffle answer options for each attempt."
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.showOptionLetters`}
              label="Show option letters"
              description="Display A, B, C... before each option."
            />
            <MediaConfig
              control={control}
              ratioName={`questions.${questionIndex}.config.OptionMediaRatio`}
              showMediaName={`questions.${questionIndex}.config.showOptionMedia`}
              ratioLabel="Option image ratio"
              showMediaLabel="Show option media"
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Style">
            <SelectField
              control={control}
              name={`questions.${questionIndex}.config.layout`}
              label="Layout"
              description="Choose how options are displayed."
              options={[
                { label: "Vertical", value: "VERTICAL" },
                { label: "Horizontal", value: "HORIZONTAL" },
                { label: "Grid", value: "GRID" },
              ]}
            />
          </ConfigSection>
        </div>
      </ConfigPanel>
    </div>
  );
}
