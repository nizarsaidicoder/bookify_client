import { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { add_tag } from "@/api/tag";
import type { Tag, TagCreationData } from "@/types/types_tag";

interface TagAddProps {
  onAddTag: (tag: Tag) => void;
}

function TagAdd({ onAddTag }: TagAddProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const data: TagCreationData = {
      name,
      color: randomColor,
    };
    try {
      const addedTag: Tag = await add_tag(data);
      onAddTag(addedTag);
      toast(`Tag added successfully.`, {
        description: `Tag ${name} added successfully.`,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast("An error occurred while adding the tag.", {
          description: err.message,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="border border-gray-200 rounded-sm p-6 flex flex-col gap-4 w-full max-w-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-center">Add a Tag</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 h-full">
        {/* Add h-full here */}
        <div className="space-y-4 flex flex-col flex-grow">
          {/* Wrap inputs in a flex container */}
          <Input
            name="name"
            type="text"
            placeholder="Title"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          {/* Button container at bottom */}
          <Button
            type="submit"
            variant="default"
            size="default"
            className="w-full">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <p>Adding</p>
              </div>
            ) : (
              "Add Tag"
            )}
          </Button>
          <Button
            type="reset"
            variant="outline"
            size="default"
            className="w-full">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TagAdd;
