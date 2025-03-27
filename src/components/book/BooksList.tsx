import { BookBase } from "@types";
import { NavLink } from "react-router";
import BookCard from "./BookCard";

interface BooksListProps {
  books: BookBase[];
}

function BooksList({ books }: BooksListProps) {
  if (!books) return null;
  if (!books.length) return <p className="text-center">Aucun livre trouvé</p>;

  return (
    <>
      <div className="w-full h-[90vh] p-4 custom-scroll grid grid-cols-3 gap-4 border-1 border-gray-200 rounded-md">
        {books.map((book) => (
          <NavLink
            to={`/books/${book.id}`}
            key={book.id}>
            <BookCard
              id={book.id}
              title={book.title}
              publicationYear={book.publicationYear}
              cover={book.cover}
            />
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default BooksList;
