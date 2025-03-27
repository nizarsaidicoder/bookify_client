import { Book, BookCreationData, Tag } from "@types";
import { add_book } from "@/api/book";
import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { get_tags } from "@/api/tag";
import { MultiSelect } from "@components/ui/multiselect";

interface AuthorBookAddFormProps {
  authorId: number;
  onAddBook: (book: Book) => void;
}

function AuthorBookAddForm({ authorId, onAddBook }: AuthorBookAddFormProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]); // ✅ Persist tags in state

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await get_tags();
        setTags(fetchedTags.map((tag: Tag) => tag.name)); // ✅ Update state correctly
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []); // ✅ Runs only once on mount

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const publicationYear = formData.get("publicationYear")
      ? Number(formData.get("publicationYear"))
      : new Date().getFullYear();
    const cover = formData.get("cover") as string;
    const description = formData.get("description") as string;

    // Generate a random cover image if not provided
    const randomBookId = Math.floor(Math.random() * 1000000);
    const coverUrl =
      cover || `https://covers.openlibrary.org/b/id/${randomBookId}-M.jpg`;

    const newBook: BookCreationData = {
      title,
      publicationYear,
      cover: coverUrl,
      description,
    };

    try {
      const addedBook: Book = await add_book(authorId, newBook);
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
    <div className="border border-gray-200 rounded-sm p-6 flex flex-col gap-4 w-md max-w-lg h-[98vh] overflow-hidden">
      <h2 className="text-2xl font-bold text-center">Add a Book</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 h-full">
        {" "}
        {/* Add h-full here */}
        <div className="space-y-4 flex flex-col flex-grow">
          {" "}
          {/* Wrap inputs in a flex container */}
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
            required
          />
          <Input
            name="cover"
            type="text"
            placeholder="Cover Image URL (optional)"
          />
          <MultiSelect
            options={tags}
            selected={selectedTags}
            onChange={setSelectedTags}
            placeholder="Select tags"
          />
          <Textarea
            name="description"
            placeholder="Description"
            className="min-h-[200px] flex-grow" // Add flex-grow here
          />
        </div>
        <div className="flex flex-col gap-2">
          {" "}
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
        </div>
      </form>
    </div>
  );
}

export default AuthorBookAddForm;
