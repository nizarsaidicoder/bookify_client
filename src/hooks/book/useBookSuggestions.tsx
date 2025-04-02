import { useEffect, useState } from "react";
import { BookBase } from "@types";
import { get_similar_books } from "@/api/book";

export const useBookSuggestions = (bookId: number) => {
  const [suggestions, setSuggestions] = useState<BookBase[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const data = await get_similar_books(bookId);
        setSuggestions(data);
        setError(null);
      } catch (err) {
        setError("Error loading suggestions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchSuggestions();
    }
  }, [bookId]);

  return { suggestions, loading, error };
};
