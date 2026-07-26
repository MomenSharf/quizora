import { createId } from "@paralleldrive/cuid2";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { IconCircle, IconPlus, IconRectangle } from "@tabler/icons-react";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { ImageCanvas } from "./image-canvas";
import { TapFindTarget } from "@/features/quiz-editor/validation/question";
import { HotspotRow } from "./hotspot-row";

export function TapFindEditor({ questionIndex }: { questionIndex: number }) {
  const { control, setValue } = useQuizForm();

  const targets =
    useWatch({
      control,
      name: `questions.${questionIndex}.content.targets`,
    }) ?? [];

  const image = useWatch({
    control,
    name: `questions.${questionIndex}.content.image`,
  });

  const [selectedId, setSelectedId] = useState<string>();

  const updateTargets = (targets: TapFindTarget[]) => {
    setValue(`questions.${questionIndex}.content.targets`, targets, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addRectangle = () => {
    const target: TapFindTarget = {
      id: createId(),
      label: "",
      shape: "RECT",

      x: 0.5,
      y: 0.5,

      width: 0.2,
      height: 0.15,
    };

    updateTargets([...targets, target]);

    setSelectedId(target.id);
  };

  const addCircle = () => {
    const target: TapFindTarget = {
      id: createId(),
      label: "",
      shape: "CIRCLE",

      x: 0.5,
      y: 0.5,

      radius: 0.08,
    };

    updateTargets([...targets, target]);

    setSelectedId(target.id);
  };

  const duplicateTarget = (id: string) => {
    const target = targets.find((t) => t.id === id);

    if (!target) return;

    const newTarget = {
      ...target,
      id: createId(),
    };

    updateTargets([...targets, newTarget]);

    setSelectedId(newTarget.id);
  };

  const deleteTarget = (id: string) => {
    updateTargets(targets.filter((t) => t.id !== id));

    if (selectedId === id) {
      setSelectedId(undefined);
    }
  };

  const updateTargetLabel = (id: string, value: string) => {
    const target = targets.find((t) => t.id === id);

    if (!target) return;

    updateTargets([
      ...targets.map((t) => (t.id === id ? { ...t, label: value } : t)),
    ]);
  };

  const updateTargetShape = (id: string, shape: "RECT" | "CIRCLE") => {
    updateTargets(
      targets.map((target) => {
        if (target.id !== id) return target;

        if (target.shape === shape) return target;

        if (shape === "CIRCLE") {
          // target is RECT here
          if (target.shape !== "RECT") return target;

          return {
            id: target.id,
            label: target.label,
            shape: "CIRCLE",
            x: target.x,
            y: target.y,
            radius: Math.min(target.width, target.height) / 2,
          };
        }

        // target is CIRCLE here
        if (target.shape !== "CIRCLE") return target;

        return {
          id: target.id,
          label: target.label,
          shape: "RECT",
          x: target.x,
          y: target.y,
          width: target.radius * 2,
          height: target.radius * 2,
        };
      }),
    );
  };

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-xl border border-(--primary)/20 bg-card">
        <div className="flex items-center justify-between border-b border-(--primary)/15 px-5 py-4">
          <div>
            <h3 className="font-semibold">Image Hotspots</h3>

            <p className="text-sm text-muted-foreground">
              Draw, resize and label answer targets.
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <IconPlus size={16} />
                Add Target
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={addRectangle}>
                <IconRectangle size={16} />
                Rectangle
              </DropdownMenuItem>

              <DropdownMenuItem onClick={addCircle}>
                <IconCircle size={16} />
                Circle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="p-4">
          <ImageCanvas
            image={"https://picsum.photos/id/1043/1600/1000"}
            targets={targets}
            selectedId={selectedId}
            onSelectedChange={setSelectedId}
            onTargetsChange={updateTargets}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-(--primary)/20 bg-card">
        <div className="flex items-center justify-between border-b border-(--primary)/15 px-4 py-3">
          <div>
            <h4 className="text-sm font-medium">Targets</h4>

            <p className="text-xs text-muted-foreground">
              {targets.length} target{targets.length !== 1 && "s"}
            </p>
          </div>
        </div>

        <ScrollArea className="max-h-72">
          <div className="space-y-2 p-3">
            {targets.map((target) => {
              return (
                <HotspotRow
                  key={target.id}
                  label={target.label}
                  shape={target.shape}
                  active={selectedId === target.id}
                  onClick={() => setSelectedId(target.id)}
                  onLabelChange={(value) => updateTargetLabel(target.id, value)}
                  onShapeChange={(shape) => updateTargetShape(target.id, shape)}
                  onDuplicate={() => duplicateTarget(target.id)}
                  onDelete={() => deleteTarget(target.id)}
                  canDelete={selectedId !== target.id}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
