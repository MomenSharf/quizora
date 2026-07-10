import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { IconChevronRight, IconMenu2, IconRotate } from "@tabler/icons-react";
import QuizTabs from "./quiz-tabs";

export default function MobileHeaderSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl md:hidden">
          <IconMenu2 className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex w-[320px] flex-col p-0">
        <SheetHeader className="border-b px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-lg">Quiz Editor</SheetTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your quiz
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          <section className="flex justify-between items-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Theme
            </p>

            <ThemeToggle />
          </section>
          <section className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Navigation
            </p>

            <QuizTabs />
          </section>

          <Separator />

          <section className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Actions
            </p>

            <Button
              variant="ghost"
              className="h-12 w-full justify-between rounded-xl"
            >
              <span className="flex items-center gap-3">
                <IconRotate className="size-4" />
                Reset quiz
              </span>

              <IconChevronRight className="size-4 text-muted-foreground" />
            </Button>
          </section>
        </div>

        <div className="border-t bg-muted/30 px-5 py-4">
          <p className="text-center text-xs text-muted-foreground">
            Quiz Editor
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
