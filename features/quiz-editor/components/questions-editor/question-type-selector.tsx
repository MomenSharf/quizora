import { Button } from "@/components/ui/button";
import { IconRocket } from "@tabler/icons-react";
import React from "react";

const QestionTypeSelector = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
    <Button size="icon" variant="outline">
      <IconRocket />
      <h5>Multiple Choice</h5>
      p
    </Button>
      </div>
    </div>
  );
};

export default QestionTypeSelector;
