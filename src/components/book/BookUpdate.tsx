import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { update_book } from "@/api/book";
import { Book, BookUpdateData, Tag } from "@types";
import { useEffect, useState } from "react";
import { MultiSelect } from "@components/ui/multiselect";
import { get_tags } from "@/api/tag";
import { Button } from "@components/ui/button";
interface BookUpdateProps {
  book: Book;
  onBookUpdate: (book: Book) => void;
}

function BookUpdate({ book, onBookUpdate }: BookUpdateProps) {
  const [formData, setFormData] = useState({
    title: book.title || "",
    publicationYear: book.publicationYear || new Date().getFullYear(),
    description: book.description || "",
    cover: book.cover || "",
  });
  const [tags, setTags] = useState<string[]>([]); // ✅ Persist tags in state
  const [selectedTags, setSelectedTags] = useState<string[]>(
    book.tags?.map((tag) => tag.name) || []
  ); // ✅ Persist selected tags in state

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const bookPayload: BookUpdateData = {
      title: formData.title,
      publicationYear: Number(formData.publicationYear),
      description: formData.description,
      cover: formData.cover,
      tags: selectedTags.join(","),
    };
    try {
      const updatedBook = await update_book(book.id, bookPayload);
      onBookUpdate(updatedBook);
      toast("Book updated successfully");
    } catch (error) {
      toast("Failed to update book " + error);
    }
  };

  const handleReset = () => {
    setFormData({
      title: book.title || "",
      publicationYear: book.publicationYear || new Date().getFullYear(),
      description: book.description || "",
      cover: book.cover || "",
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Book</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Make changes to the book details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="publicationYear">Publication Year</Label>
            <Input
              id="publicationYear"
              type="number"
              value={formData.publicationYear}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cover">Cover URL</Label>
            <Input
              id="cover"
              value={formData.cover}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleTextareaChange}
              className="col-span-3 max-h-[250px]"
            />
          </div>
          <div className="grid  items-center gap-4">
            <Label htmlFor="tags">Tags</Label>
            <MultiSelect
              selected={selectedTags}
              options={tags}
              onChange={setSelectedTags}
              placeholder="Select tags"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}>
            Save changes
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}>
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookUpdate;
