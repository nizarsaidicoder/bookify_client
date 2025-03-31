import { useParams, Link, useNavigate } from "react-router";
import { useBook } from "@/hooks/useBook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { delete_book } from "@/api/book";
import { toast } from "sonner";
import BookUpdate from "@components/book/BookUpdate";
import BookSuggestions from "@components/book/BookSuggestions";
import { Comment } from "@/types/types_comment";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { createRating, getRatings, updateRating } from "@/api/ratings";
import {
  Rating,
  RatingCreationData,
  RatingUpdateData,
} from "@/types/types_rating";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@components/ui/popover";

function BookPage() {
  const { book_id } = useParams();
  const { book, author, loading, setBook } = useBook(book_id);
  const [isFavorite, setIsFavorite] = useState(false);
  const userID: number = JSON.parse(localStorage.getItem("userId") || "0");
  const [rating, setRating] = useState<Rating | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRating = async () => {
      if (!book) return;
      try {
        const ratings = await getRatings(book.id);
        const userRating =
          ratings.find((rating) => rating?.userId == userID) || null;
        if (userRating) {
          setRating(userRating);
        } else {
          setRating(null);
        }
      } catch (error) {
        console.log(`Error fetching ratings for book ${book.id}:`, error);
      }
    };
    if (userID) fetchRating();
  }, [book, userID]);

  useEffect(() => {
    const favoriteBooks = JSON.parse(
      localStorage.getItem("favoriteBooks") || "[]"
    );
    setIsFavorite(favoriteBooks.includes(book?.id));
  }, [book?.id]);

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
  const handleRating = async (value: number) => {
    if (!book) return;
    if (rating) {
      const updatedRating: RatingUpdateData = { id: rating.id, value: value };
      try {
        await updateRating(updatedRating);
        setRating((prevRating) =>
          prevRating ? { ...prevRating, value } : null
        );
        toast("Rating updated successfully");
      } catch (error) {
        toast("Failed to update rating");
        console.error("Error updating rating:", error);
      }
    } else {
      const newRating: RatingCreationData = {
        bookId: book.id,
        userId: userID,
        value: value,
      };
      console.log(newRating);
      try {
        const rating: Rating = await createRating(newRating);
        setRating(rating);
        toast("Rating added successfully");
      } catch (error) {
        toast("Failed to add rating");
        console.error("Error adding rating:", error);
      }
    }
  };

  const handleFavorite = async (favorite: boolean) => {
    if (!book) return;
    const favoriteBooks = JSON.parse(
      localStorage.getItem("favoriteBooks") || "[]"
    );
    if (favorite) {
      if (!favoriteBooks.includes(book.id)) {
        favoriteBooks.push(book.id);
        setIsFavorite(true);
      }
    } else {
      const index = favoriteBooks.indexOf(book.id);
      if (index > -1) {
        favoriteBooks.splice(index, 1);
        setIsFavorite(false);
      }
    }
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
    toast(
      isFavorite ? "Book removed from favorites" : "Book added to favorites"
    );
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
    <div className="w-full h-[98vh] mx-auto p-6 shadow-md rounded-lg border border-gray-200 custom-scroll flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold">{book.title} | </h2>
          <span className="text-3xl font-bold">
            {book.avgRating?.toFixed(2)} ⭐{" "}
          </span>
        </div>
        <div className="flex gap-2">
          {userID && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Rate book</Button>
              </PopoverTrigger>
              <PopoverContent className=" outline-1 rounded-sm mt-4">
                <div className="flex gap-2 items-center p-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={` ${
                        i <= (rating?.value ?? 0) ? "text-violet-600" : ""
                      } cursor-pointer hover:text-violet-600 `}
                      onClick={() => handleRating(i)}>
                      <Star className="ml-1" />
                    </span>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
          <BookUpdate
            book={book}
            onBookUpdate={setBook}
          />
          <Button
            variant="destructive"
            onClick={handleDelete}>
            Delete
          </Button>
          {isFavorite ? (
            <Button
              variant="outline"
              onClick={() => handleFavorite(false)}>
              <Heart className="text-red-500" /> Unfavorite
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => handleFavorite(true)}>
              <Heart className="text-red-500" /> Favorite
            </Button>
          )}
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
      <BookSuggestions id={book.id} />
      <CommentList comments={book.comments || []} />
    </div>
  );
}

export default BookPage;

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  return (
    <div className="mt-6 ">
      <h3 className="text-xl font-semibold">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 border-b border-gray-200">
            <p className="text-sm ">{comment.content}</p>
            <p className="text-xs text-violet-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}
