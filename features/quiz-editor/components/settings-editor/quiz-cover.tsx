import { Lock } from "lucide-react";
import { ImageUploadPlaceholder } from "../image-upload/image-upload-placeholder";
import { motion } from "framer-motion";

export default function QuizCover() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="order-first lg:order-last lg:sticky lg:top-6 lg:self-start"
    >
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-sm font-semibold">Cover image</h2>

          <p className="text-xs text-muted-foreground">
            Make your quiz stand out.
          </p>
        </div>

        <div className="p-4">
          <ImageUploadPlaceholder />
        </div>
      </section>

      <div className="mt-4 rounded-2xl border border-dashed bg-muted/30 p-4">
        <div className="flex gap-3">
          <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-background shadow-sm">
            <Lock className="size-3.5 text-muted-foreground" />
          </div>

          <div>
            <p className="text-xs font-medium">Your settings are saved</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Changes are automatically saved while you edit your quiz.
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}