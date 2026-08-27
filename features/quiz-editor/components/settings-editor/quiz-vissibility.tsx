import { Controller } from "react-hook-form";
import VisibilitySelector from "./visibility-selector";
import { Globe2 } from "lucide-react";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { motion } from "framer-motion";

export default function QuizVisibility() {
  const { control } = useQuizForm();

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl border bg-card shadow-sm"
    >
      <div className="border-b px-5 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
            <Globe2 className="size-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold">Visibility</h2>
            <p className="text-xs text-muted-foreground">
              Choose who can access your quiz.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <Controller
          name="settings.visibility"
          control={control}
          render={({ field }) => (
            <VisibilitySelector value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
    </motion.section>
  );
}