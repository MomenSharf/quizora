import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  IconCheck,
  IconChevronLeft,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { EditableTitle } from "./editable-title";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import QuizEditorTabs from "./quiz-editor-tabs";

const Header = () => {
  return (
    <header className="md:col-span-2 p-2  border-b flex justify-between items-center gap-1">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          className="cursor-pointer group relative overflow-hidden hover:bg-primary size-12"
        >
          <Icons.logo className="absolute stroke-primary-foreground fill-primary-foreground group-hover:-translate-y-7 group-hover:opacity-0 transition-all size-6" />
          <IconChevronLeft className="absolute translate-y-7 group-hover:translate-y-0 transition-transform" />
        </Button>
        <div className="max-sm:hidden">
          <EditableTitle title="Quiz Title" />
        </div>
      </div>
      <QuizEditorTabs />

      <div className="flex items-center gap-2">
        {/* <ThemeToggle /> */}
      
          <div className="flex flex-col items-center gap-1">

         <div className="flex justify-center items-center p-1 rounded-full bg-success size-5">
          
          <IconCheck className="text-primary-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">All chages saved</p>
         </div>
        <Button className="cursor-pointer" size="lg">
          <IconPlayerPlay />
          <div className="max-sm:hidden">Preview</div>
        </Button>
      </div>
    </header>
  );
};

export default Header;
