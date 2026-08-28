import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SwitchField } from "../fields/switch-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";

type FillBlankConfigProps = {
  questionIndex: number;
};

export function FillBlankConfig({
  questionIndex,
}: FillBlankConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-fill-blank)",
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

          <ConfigSection title="Answer">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.caseSensitive`}
              label="Case sensitive"
              description="Require uppercase and lowercase letters to match exactly."
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.trimWhitespace`}
              label="Trim whitespace"
              description="Ignore spaces at the beginning and end of an answer."
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.ignoreExtraSpaces`}
              label="Ignore extra spaces"
              description="Treat multiple consecutive spaces as a single space."
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Input">
            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.autoResizeInputs`}
              label="Auto-resize inputs"
              description="Adjust the input width to fit the entered answer."
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