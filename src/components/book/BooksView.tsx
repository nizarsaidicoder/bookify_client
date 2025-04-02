import BookSideBar from "@components/book/BooksSideBar";
import BooksList from "@components/book/BooksList";
import { useEffect, useState } from "react";
import { get_books } from "@/api/book";
import { GetBookParams, BookBase } from "@types";
import { Loader2Icon } from "lucide-react";
import BooksFilter from "./BooksFilter";
import Paginator from "@components/ui/Paginator";

function BooksView() {
  const [books, setBooks] = useState<BookBase[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<GetBookParams>({});
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: newPage,
    }));
  };

  const fetchBooks = async (filter: GetBookParams) => {
    try {
      const data = await get_books(filter);
      setBooks(data.books);
      setMaxPage(data.totalPages);
    } catch (err) {
      setError("Error loading books");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks({});
  }, []);

  useEffect(() => {
    fetchBooks(filter);
  }, [filter, page]);

  if (loading)
    return <Loader2Icon className="animate-spin h-10 w-10 mx-auto" />;

  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="flex flex-row gap-8">
        <BookSideBar>
          <BooksFilter onFilter={setFilter} />
        </BookSideBar>
        <div className="flex flex-col gap-4 w-full">
          <BooksList books={books} />
          <Paginator
            onPageChange={handlePageChange}
            page={page}
            maxPage={maxPage}
          />
        </div>
      </div>
    </div>
  );
}

export default BooksView;
