import { useEffect, useState } from "react";
import { get_book } from "@/api/book";
import { Book } from "@types";

export function useFavoriteBooks() {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const favoriteBooksIds = JSON.parse(
          localStorage.getItem("favoriteBooks") || "[]"
        ) as number[];

        // Filter out invalid IDs and duplicates
        const uniqueValidIds = [...new Set(favoriteBooksIds)].filter(
          (id) => typeof id === "number" && id > 0
        );

        // Fetch books in parallel for better performance
        const bookPromises = uniqueValidIds.map((bookId) => get_book(bookId));
        const books = await Promise.all(bookPromises);

        setFavoriteBooks(books);
      } catch (err) {
        console.error("Failed to fetch favorite books:", err);
        setError("Failed to load favorite books. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteBooks();
  }, []);

  return { favoriteBooks, isLoading, error };
}
