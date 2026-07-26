import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  IconCircle,
  IconCopy,
  IconDotsVertical,
  IconRectangle,
  IconTrash,
} from "@tabler/icons-react";

type HotspotRowProps = {
  active?: boolean;

  shape: "RECT" | "CIRCLE";

  label: string;

  onLabelChange: (value: string) => void;

  onShapeChange: (shape: "RECT" | "CIRCLE") => void;

  onDuplicate: () => void;

  onDelete: () => void;

  onClick: () => void;

  canDelete?: boolean;
};

export function HotspotRow({
  active,
  shape,
  label,
  onClick,
  onDelete,
  onDuplicate,
  onLabelChange,
  onShapeChange,

  canDelete = true,
}: HotspotRowProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 rounded-lg border p-2 transition-all",
        active
          ? "border-primary bg-primary/8 ring-1 ring-primary/20"
          : "border-border hover:bg-muted/40",
      )}
    >
      <Select value={shape} onValueChange={onShapeChange}>
        <SelectTrigger className="h-9 w-14 shrink-0 border-none bg-transparent shadow-none">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="RECT">
            <div className="flex items-center gap-2">
              <IconRectangle size={16} />
              Rectangle
            </div>
          </SelectItem>

          <SelectItem value="CIRCLE">
            <div className="flex items-center gap-2">
              <IconCircle size={16} />
              Circle
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Input
        value={label}
        onChange={(e) => onLabelChange(e.target.value)}
        placeholder="Target label..."
        className="h-9 border-none bg-transparent shadow-none focus-visible:ring-0"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="size-9 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
          >
            <IconDotsVertical size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onDuplicate}>
            <IconCopy size={16} />
            Duplicate
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={onDelete}
            disabled={!canDelete}
          >
            <IconTrash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
