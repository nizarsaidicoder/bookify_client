import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Tag } from "@types";
import { update_tag, delete_tag } from "@/api/tag";
import { toast } from "sonner";
import { TagUpdateData } from "@/types/types_tag";
import { useState } from "react";

interface TagDialogProps {
  tag: Tag;
  onTagUpdate: (tag: Tag) => void;
  onTagDelete: (tagId: number) => void;
}

function TagDialog({ tag, onTagUpdate, onTagDelete }: TagDialogProps) {
  const [name, setName] = useState(tag.name);
  const [, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await delete_tag(tag.id);
      onTagDelete(tag.id); // Notify parent with the deleted tag ID
      toast.success("Tag deleted successfully", {
        description: `Tag ${name} deleted successfully.`,
      });
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("Failed to delete tag", {
        description: "Please try again later.",
      });
    }
  };

  const handleUpdate = async () => {
    const payload: TagUpdateData = {
      name: name,
    };
    try {
      const response = await update_tag(tag.id, payload);
      onTagUpdate(response); // Notify parent with the updated tag
      toast.success("Tag updated successfully", {
        description: `Tag ${name} updated successfully.`,
      });
    } catch (error) {
      console.error("Error updating tag:", error);
      toast.error("Failed to update tag", {
        description: "Please try again later.",
      });
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setName(tag.name); // Reset the name when the dialog is closed
    }
  };

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="outline">{name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            variant="destructive"
            type="button">
            Delete
          </Button>
          <Button onClick={handleUpdate}>Save changes</Button>
          <Button
            variant="outline"
            type="reset">
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TagDialog;
