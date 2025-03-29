import BooksList from "@components/book/BooksList";
import { useEffect, useState } from "react";
import { get_book } from "@/api/book";
import { Book } from "@types";

function FavoritesPage() {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  useEffect(() => {
    const favoriteBooksIds = JSON.parse(
      localStorage.getItem("favoriteBooks") || "[]"
    );

    const fetchBooks = async () => {
      const booksMap = new Map<number, Book>();
      for (const bookId of favoriteBooksIds) {
        if (!booksMap.has(bookId)) {
          const book = await get_book(bookId);
          booksMap.set(bookId, book);
        }
      }
      setFavoriteBooks(Array.from(booksMap.values()));
    };
    fetchBooks();
  }, []);

  return (
    <>
      <BooksList books={favoriteBooks} />
    </>
  );
}

export default FavoritesPage;
