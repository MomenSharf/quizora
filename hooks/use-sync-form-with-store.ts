import { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Options<T extends FieldValues> {
  form: UseFormReturn<T>;
  values: T;
  onChange: (values: T) => void;
  delay?: number;
}

export function useSyncFormWithStore<T extends FieldValues>({
  form,
  values,
  onChange,
  delay = 300,
}: Options<T>) {
  const initialized = useRef(false);

  useEffect(() => {
    form.reset(values as DefaultValues<T>);

    initialized.current = true;
  }, [values, form]);

  const sync = useDebouncedCallback((values: T) => {
    onChange(values);
  }, delay);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!initialized.current) return;

      sync(values as T);
    });

    return () => subscription.unsubscribe();
  }, [form, sync]);
}