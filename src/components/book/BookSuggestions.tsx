import { get_similar_books } from "@/api/book";
import BooksCarousel from "@components/book/BooksCarousel";
import { BookBase } from "@types";
import { useEffect, useState } from "react";

interface BookSuggestionsProps {
  id: number;
}

function BookSuggestions({ id }: BookSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<BookBase[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await get_similar_books(id);
        setSuggestions(data);
      } catch (err) {
        setError("Error loading suggestions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!suggestions) return null;

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold">Suggestions</h2>
      <BooksCarousel
        books={suggestions}
        show={4}
      />
    </div>
  );
}

export default BookSuggestions;
