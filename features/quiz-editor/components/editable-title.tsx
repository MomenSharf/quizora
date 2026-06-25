import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconPencilBolt } from "@tabler/icons-react";

export function EditableTitle({ title }: { title: string }) {
  return (
    <Dialog>
      <form >
        <DialogTrigger asChild>
          <div className="flex gap-1 items-center cursor-pointer group ">
            <h1 className="md:text-lg font-semibold truncate max-w-28 md:max-w-50">{title}</h1>
            <IconPencilBolt
              size={16}
              className="text-muted-foreground group-hover:text-foreground"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Quiz Title</DialogTitle>
            <DialogDescription>
              Update your quiz name to make it clear and easy to recognize.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="quiz-title">Title</Label>
              <Input id="quiz-title" name="title" defaultValue={title} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
