import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { BaseQuestionConfig } from "../base-question-config";
import { ConfigSection } from "../config-section";
import { MediaConfig } from "../media-config";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "../config-panel";

type TypeAnswerConfigProps = {
  questionIndex: number;
};

export function TypeAnswerConfig({
  questionIndex,
}: TypeAnswerConfigProps) {
  const { control } = useQuizForm();

  return (
    <div
      style={
        {
          "--primary": "var(--question-type-answer)",
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

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.acceptRegex`}
              label="Accept regular expressions"
              description="Allow answers to be matched using a regular expression."
            />
          </ConfigSection>

          <Separator className="my-4 opacity-50" />

          <ConfigSection title="Input">
            <SelectField
              control={control}
              name={`questions.${questionIndex}.config.maxLength`}
              label="Maximum length"
              description="Maximum number of characters the player can enter."
              options={[
                { label: "25 characters", value: "25" },
                { label: "50 characters", value: "50" },
                { label: "100 characters", value: "100" },
                { label: "150 characters", value: "150" },
                { label: "250 characters", value: "250" },
                { label: "500 characters", value: "500" },
              ]}
            />

            <SwitchField
              control={control}
              name={`questions.${questionIndex}.config.multiline`}
              label="Multiline input"
              description="Allow players to enter an answer across multiple lines."
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