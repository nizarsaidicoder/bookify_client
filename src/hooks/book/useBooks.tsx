import { useState } from "react";
import { get_books } from "@/api/book";
import { GetBookParams, BookBase } from "@types";

export const useBooks = () => {
  const [books, setBooks] = useState<BookBase[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = async (filter: GetBookParams) => {
    try {
      setLoading(true);
      const data = await get_books(filter);
      setBooks(data.books);
      return data.totalPages;
    } catch (err) {
      setError("Error loading books");
      console.error(err);
      return 1; // Default to 1 page on error
    } finally {
      setLoading(false);
    }
  };

  return { books, error, loading, fetchBooks };
};
