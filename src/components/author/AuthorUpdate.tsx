import { useParams, Link, useNavigate } from "react-router";
import { useBook } from "@/hooks/useBook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { update_book, delete_book } from "@/api/book";
import { Book, BookUpdateData } from "@types";
import { useState } from "react";

function BookPage() {
  const { book_id } = useParams();
  const { book, author, loading, setBook } = useBook(book_id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!book) return;
    try {
      await delete_book(book.id);
      toast("Book deleted successfully");
      navigate("/books");
    } catch (error) {
      toast("Failed to delete book");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!book) return <p className="text-center mt-10">Book not found.</p>;

  const tagColors = [
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-red-200 text-red-800",
    "bg-yellow-200 text-yellow-800",
    "bg-purple-200 text-purple-800",
    "bg-pink-200 text-pink-800",
  ];

  return (
    <div className="w-full h-[98vh] mx-auto p-6 shadow-md rounded-lg border border-gray-200">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <div className="flex gap-2">
          <BookUpdate
            book={book}
            onBookUpdate={setBook}
          />
          <Button
            variant="destructive"
            onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {(book.tags ?? []).length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {book.tags?.map((tag, index) => (
            <Badge
              key={tag.id}
              className={`${
                tagColors[index % tagColors.length]
              } px-3 py-1 rounded-md`}>
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-6">
        <div className="w-48 flex-shrink-0">
          <img
            src={book.cover ?? "https://via.placeholder.com/150"}
            alt={book.title}
            className="w-full h-auto rounded-md shadow"
          />
        </div>

        <div className="flex-1">
          {author && (
            <h2 className="text-lg ">
              by{" "}
              <Link
                to={`/authors/${author.id}`}
                className="text-violet-600 hover:underline">
                {author.firstname} {author.lastname}
              </Link>
            </h2>
          )}
          <p className="text-sm text-gray-500">
            Published in {book.publicationYear}
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="mt-2 ">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const updatedBook: BookUpdateData = {
      title: formData.title,
      publicationYear: formData.publicationYear,
      description: formData.description,
      cover: formData.cover,
    };
    try {
      await update_book(book.id, updatedBook);
      onBookUpdate({ ...book, ...updatedBook });
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Make changes to the book details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="title"
              className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="publicationYear"
              className="text-right">
              Publication Year
            </Label>
            <Input
              id="publicationYear"
              type="number"
              value={formData.publicationYear}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="cover"
              className="text-right">
              Cover URL
            </Label>
            <Input
              id="cover"
              value={formData.cover}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleTextareaChange}
              className="col-span-3"
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

export default BookPage;
