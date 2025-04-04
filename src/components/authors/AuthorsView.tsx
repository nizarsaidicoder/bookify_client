import AuthorsSideBar from "@components/authors/AuthorsSideBar";
import AuthorsList from "@components/authors/AuthorsList";
import { useEffect, useState } from "react";
import { get_authors } from "@/api/author";
import { Author, AuthorBase, GetAuthorParams } from "@types";
import AuthorAddForm from "./AuthorAddForm";
import AuthorsFilter from "./AuthorsFilter";
import Paginator from "@components/ui/Paginator";
import LoadingIndicator from "@components/ui/loading-indicator";

function AuthorsView() {
  const [authors, setAuthors] = useState<AuthorBase[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<GetAuthorParams>({});
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: newPage,
    }));
  };

  const fetchAuthors = async (filter: GetAuthorParams) => {
    try {
      const data = await get_authors(filter);
      setAuthors(data.authors);
      setMaxPage(data.totalPages);
    } catch (err) {
      setError("Erreur lors du chargement des auteurs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors({});
  }, []);

  useEffect(() => {
    fetchAuthors(filter);
  }, [filter, page]);

  const handleAddAuthor = (newAuthor: Author) => {
    setAuthors([newAuthor, ...authors]);
  };

  const handleFilter = (newFilter: GetAuthorParams) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  if (loading) return <LoadingIndicator />;

  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="flex flex-row gap-8">
        <AuthorsSideBar>
          <AuthorsFilter onFilter={handleFilter} />
          <AuthorAddForm onAddAuthor={handleAddAuthor} />
        </AuthorsSideBar>
        <div className="flex flex-col gap-4 w-full">
          <AuthorsList authors={authors} />
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

export default AuthorsView;
