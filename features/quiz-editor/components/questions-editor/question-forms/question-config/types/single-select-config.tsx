import { ConfigWrapper } from "../sheet";
import { SelectField } from "../fields/select-field";
import { SwitchField } from "../fields/switch-field";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";

export function SingleSelectConfig({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const { control } = useQuizForm();
  return (
    <ConfigWrapper
      title="Single Choice"
      description="Configure how answer choices are presented."
      separator={false}
    >
      {/* <SelectField
        control={control}
        name={`questions.${questionIndex}.config.`}
        label="Layout"
        description="Choose how options are displayed."
        options={[
          {
            label: "Vertical",
            value: "VERTICAL",
          },
          {
            label: "Horizontal",
            value: "HORIZONTAL",
          },
          {
            label: "Grid",
            value: "GRID",
          },
        ]}
      /> */}

      <SwitchField
        control={control}
        name={`questions.${questionIndex}.config.randomizeOptions`}
        label="Randomize options"
        description="Shuffle answer options for each attempt."
      />

      <SwitchField
        control={control}
        name={`questions.${questionIndex}.config.showOptionLetters`}
        label="Show option letters"
        description="Display A, B, C... before each option."
      />
    </ConfigWrapper>
  );
}
