import { Button } from "@/components/ui/button";
import { IconPick, IconSettings2 } from "@tabler/icons-react";

const QuestionHeader = () => {
  return (
    <div className="flex p-2 items-center justify-between gap-3 border-b bg-background">
      <div className="flex gap-1.5 items-center">
        <Button size="icon" variant="outline">
          <IconPick />
        </Button>
        <h3 className="font-semibold">Single Choice</h3>
      </div>
      <Button size="icon" variant="ghost">
        <IconSettings2 />
      </Button>
    </div>
  );
};

export default QuestionHeader;
