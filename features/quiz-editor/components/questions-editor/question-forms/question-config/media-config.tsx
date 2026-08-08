import { Control, FieldPath, FieldValues } from "react-hook-form";

import { SelectField } from "./fields/select-field";
import { SwitchField } from "./fields/switch-field";
import { ConfigSection } from "./config-section";
import { Ratio } from "@/features/quiz-editor/validation/quiz/image";

type MediaConfigProps<T extends FieldValues> = {
  control: Control<T>;
  ratioName: FieldPath<T>;
  showMediaName: FieldPath<T>;
  ratioLabel?: string;
  showMediaLabel?: string;
  disabled?: boolean;
};

const RATIO_OPTIONS: { label: string; value: Ratio }[] = [
  { label: "Auto", value: "AUTO" },
  { label: "1:1", value: "1:1" },
  { label: "4:3", value: "4:3" },
  { label: "3:2", value: "3:2" },
  { label: "16:9", value: "16:9" },
];

export function MediaConfig<T extends FieldValues>({
  control,
  ratioName,
  showMediaName,
  ratioLabel = "Image ratio",
  showMediaLabel = "Show media",
  disabled,
}: MediaConfigProps<T>) {
  return (
    <>
      <SwitchField
        control={control}
        name={showMediaName}
        label={showMediaLabel}
        description="Show the image or media while answering."
        disabled={disabled}
      />

      <SelectField
        control={control}
        name={ratioName}
        label={ratioLabel}
        description="Choose how the image should be displayed."
        options={RATIO_OPTIONS}
        disabled={disabled}
      />
    </>
  );
}
