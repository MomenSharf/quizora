import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";

type MatchConfigProps = {
  questionIndex: number;
};

export function MatchConfig({ questionIndex }: MatchConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-match)",
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

          <ConfigSection title="Matching">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.shuffleLeft`}
              label="Shuffle left items"
              description="Randomize the order of items on the left."
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.shuffleRight`}
              label="Shuffle right items"
              description="Randomize the order of items on the right."
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Layout">
            <SelectField
              control={control}
              name={`questions.${questionIndex}.config.layout`}
              label="Match style"
              description="Choose how players connect the matching pairs."
              options={[
                {
                  label: "Lines",
                  value: "LINES",
                },
                {
                  label: "Dropdown",
                  value: "DROPDOWN",
                },
                {
                  label: "Drag & drop",
                  value: "DRAG_DROP",
                },
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
