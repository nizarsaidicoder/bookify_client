import { Book, BookCreationData } from "@types";
import { add_book } from "@/api/book";
import { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BookAddFormProps {
  onAddBook: (book: Book) => void;
}

function BookAddForm({ onAddBook }: BookAddFormProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const publicationYear = formData.get("publicationYear")
      ? Number(formData.get("publicationYear"))
      : null;
    const cover = formData.get("cover") as string;
    const description = formData.get("description") as string;
    const authorId = formData.get("authorId")
      ? Number(formData.get("authorId"))
      : null;

    const newBook: BookCreationData = {
      title,
      publicationYear: publicationYear ?? new Date().getFullYear(),
    };

    try {
      const addedBook: Book = await add_book(authorId || 1, {
        ...newBook,
        cover,
        description,
      });
      form.reset();
      onAddBook(addedBook);
      toast(`${title} added successfully.`, {
        description: "Book added successfully.",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast("An error occurred while adding the book.", {
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
      <h2 className="text-2xl font-bold text-center">Add a Book</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4">
        <Input
          name="title"
          type="text"
          placeholder="Title"
          required
        />
        <Input
          name="publicationYear"
          type="number"
          placeholder="Publication Year"
        />
        <Input
          name="authorId"
          type="number"
          placeholder="Author ID"
          required
        />
        <Input
          name="cover"
          type="text"
          placeholder="Cover Image URL"
        />
        <Textarea
          name="description"
          placeholder="Description"
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
            "Add Book"
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

export default BookAddForm;
