import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { SelectField } from "./fields/select-field";
import { SwitchField } from "./fields/switch-field";
import { ConfigSection } from "./config-section";
import { Ratio } from "@/features/quiz-editor/validation/quiz/image";
import { Separator } from "@/components/ui/separator";

type BaseQuestionConfigProps = {
  questionIndex: number;
};

export function BaseQuestionConfig({ questionIndex }: BaseQuestionConfigProps) {
  const { control } = useQuizForm();

  return (
    <ConfigSection title="Options" separator={false}>
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
        description="Maximum time to answer."
        options={[
          { label: "Unlimited", value: "0" },
          { label: "10 Seconds", value: "10" },
          { label: "15 Seconds", value: "15" },
          { label: "20 Seconds", value: "20" },
          { label: "30 Seconds", value: "30" },
          { label: "45 Seconds", value: "45" },
          { label: "60 Seconds", value: "60" },
          { label: "90 Seconds", value: "90" },
          { label: "120 Seconds", value: "120" },
        ]}
      />

      <SelectField
        control={control}
        name={`questions.${questionIndex}.config.maxAttempts`}
        label="Max attempts"
        description="How many tries the user gets."
        options={[
          { label: "Unlimited", value: "0" },
          { label: "1 Attempt", value: "1" },
          { label: "2 Attempts", value: "2" },
          { label: "3 Attempts", value: "3" },
          { label: "5 Attempts", value: "5" },
        ]}
      />


      <SwitchField
        control={control}
        name={`questions.${questionIndex}.config.required`}
        label="Required"
        description="Users must answer this question before continuing."
      />

      <SwitchField
        control={control}
        name={`questions.${questionIndex}.config.showExplanation`}
        label="Show explanation"
        description="Display the explanation after answering."
      />

      <SwitchField
        control={control}
        name={`questions.${questionIndex}.config.allowSkip`}
        label="Allow skip"
        description="Allow users to skip this question."
      />
    </ConfigSection>
  );
}
