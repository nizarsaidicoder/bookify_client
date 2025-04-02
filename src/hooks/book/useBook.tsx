// hooks/useBook.ts
import { useEffect, useState } from "react";
import { get_book } from "@/api/book";
import { get_author } from "@/api/author";
import { Book, Author } from "@types";

export function useBook(bookId?: string) {
  const [book, setBook] = useState<Book>();
  const [author, setAuthor] = useState<Author>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        if (!bookId) return;
        const fetchedBook = await get_book(Number(bookId));
        setBook(fetchedBook);
        console.log("Fetched book:", fetchedBook);
        if (fetchedBook?.authorId) {
          const fetchedAuthor = await get_author(fetchedBook.authorId);
          setAuthor(fetchedAuthor);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [bookId]);

  return { book, author, loading,setBook };
}
