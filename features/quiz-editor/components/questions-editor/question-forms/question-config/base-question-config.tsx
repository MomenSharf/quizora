import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "./fields/select-field";
import { SwitchField } from "./fields/switch-field";
import { ConfigSection } from "./config-section";

type BaseQuestionConfigProps = {
  questionIndex: number;
};

export function BaseQuestionConfig({ questionIndex }: BaseQuestionConfigProps) {
  const { control } = useQuizForm();

  return (
    <ConfigSection title="Question" separator={false}>
      <SelectField
        control={control}
        name={`questions.${questionIndex}.config.points`}
        label="Points"
        description="Points awarded for a correct answer."
        options={[
          { label: "0 Points", value: "0" },
          { label: "1 Point", value: "1" },
          { label: "2 Points", value: "2" },
          { label: "5 Points", value: "5" },
          { label: "10 Points", value: "10" },
          { label: "20 Points", value: "20" },
          { label: "50 Points", value: "50" },
          { label: "100 Points", value: "100" },
        ]}
      />

      <SelectField
        control={control}
        name={`questions.${questionIndex}.config.timeLimit`}
        label="Time limit"
        description="Maximum time allowed to answer."
        options={[
          { label: "No limit", value: "0" },
          { label: "10 seconds", value: "10" },
          { label: "15 seconds", value: "15" },
          { label: "20 seconds", value: "20" },
          { label: "30 seconds", value: "30" },
          { label: "45 seconds", value: "45" },
          { label: "1 minute", value: "60" },
          { label: "1.5 minutes", value: "90" },
          { label: "2 minutes", value: "120" },
        ]}
      />

      <SwitchField
        control={control}
        name={`questions.${questionIndex}.config.required`}
        label="Required"
        description="Require an answer before continuing."
      />
    </ConfigSection>
  );
}
