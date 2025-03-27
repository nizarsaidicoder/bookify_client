import { Author, AuthorCreationData } from "@types";
import { add_author } from "@/api/author";
import { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@components/ui/textarea";

interface AuthorAddFormProps {
  onAddAuthor: (author: Author) => void;
}

function AuthorAddForm({ onAddAuthor }: AuthorAddFormProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as string;
    const birthYear: number | null = formData.get("birthYear")
      ? Number(formData.get("birthYear"))
      : null;
    const deathYear: number | null = formData.get("deathYear")
      ? Number(formData.get("deathYear"))
      : null;
    const newAuthor: AuthorCreationData = {
      firstname,
      lastname,
      birthYear,
      deathYear,
      bio,
      image,
    };

    try {
      const addedAuthor: Author = await add_author(newAuthor);
      form.reset();
      onAddAuthor(addedAuthor);
      toast(`${firstname} ${lastname} added successfully.`, {
        description: "Author added successfully.",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast("An error occurred while adding the author.", {
          description: err.message,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-1 rounded-sm p-6 flex flex-col gap-4 max-w-sm h-fit">
      <h2 className="text-xl font-semibold">Add an author</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4">
        <Input
          name="firstname"
          type="text"
          placeholder="First Name"
          required
        />
        <Input
          name="lastname"
          type="text"
          placeholder="Last Name"
          required
        />
        <Input
          name="birthYear"
          type="number"
          placeholder="Birth Year"
        />
        <Input
          name="deathYear"
          type="number"
          placeholder="Death Year"
        />
        <Textarea
          name="bio"
          placeholder="Bio"
        />
        <Input
          name="image"
          type="text"
          placeholder="Image URL"
        />

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
            "Add Author"
          )}
        </Button>

        <Button
          type="reset"
          variant="outline"
          size="default"
          className="w-full">
          Reset
        </Button>
      </form>
    </div>
  );
}

export default AuthorAddForm;
