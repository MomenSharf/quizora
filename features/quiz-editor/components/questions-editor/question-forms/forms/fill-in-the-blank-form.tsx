import { useWatch } from "react-hook-form";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import {
  FillBlankBlock,
  FillBlankQuestion,
} from "@/features/quiz-editor/validation/question";
import { useState } from "react";

export function FillinTheBlankForm({ questionIndex }: QuestionFormProps) {
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const { control, setValue } = useQuizForm();

  const Bolcks = useWatch({
    control,
    name: `questions.${questionIndex}.content.blocks`,
  });

  const content: FillBlankQuestion["content"] = {
    blocks: [
      {
        id: "1",
        type: "TEXT",
        text: "React was created by ",
      },
      {
        id: "2",
        type: "BLANK",
        blankId: "blank1",
      },
      {
        id: "3",
        type: "TEXT",
        text: " in ",
      },
      {
        id: "4",
        type: "BLANK",
        blankId: "blank2",
      },
      {
        id: "5",
        type: "TEXT",
        text: ".",
      },
    ],

    blanks: [
      {
        id: "blank1",
        placeholder: "Creator",
        answers: [{ id: "1", value: "Jordan Walke" }],
      },
      {
        id: "blank2",
        placeholder: "Year",
        answers: [{ id: "2", value: "2011" }],
      },
    ],
  };

  return (
    <div className="space-y-5">
      {/* <SectionCard type="FILL_BLANK" title="Fill in the Blank">
        <QuestionSection questionIndex={questionIndex} />
      </SectionCard> */}
      <SectionCard type="FILL_BLANK" title="Blanks">
        <div className="flex items-center justify-center min-h-60">
          <div className="flex">
            {content.blocks.map((block, index) => {
              if (block.type === "TEXT") {
                return (
                  <Block
                    key={block.id}
                    block={block}
                    activeBlockId={activeBlockId}
                    setActiveBlockId={setActiveBlockId}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </SectionCard>
      <SectionCard type="FILL_BLANK" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}

function Block({
  block,
  activeBlockId,
  setActiveBlockId,
}: {
  block: Extract<FillBlankBlock, { type: "TEXT" }>;
  activeBlockId: string | null;
  setActiveBlockId: (id: string | null) => void;
}) {
  if (block.id === activeBlockId) {
    return (
      <input
        type="text"
        value={block.text}
        onChange={(e) => console.log(e.target.value)}
        className="min-w-0"
        autoFocus
      />
    );
  }
  return (
    <span
      onClick={() => {
        if (activeBlockId === block.id) return;
        setActiveBlockId(block.id);
      }}
    >
      {block.text}
    </span>
  );
}
