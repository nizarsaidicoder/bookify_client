import AuthorsSideBar from "@components/author/AuthorSideBar";
import AuthorsList from "@components/author/AuthorsList";
import { useEffect, useState } from "react";
import { get_authors } from "@/api/author";
import { Author, AuthorBase, GetAuthorParams } from "@types";
import { Loader2Icon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
function AuthorsView() {
  const [authors, setAuthors] = useState<AuthorBase[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAuthors = async (filter: GetAuthorParams) => {
    try {
      const data = await get_authors(filter);
      setAuthors(data);
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

  const handleAddAuthor = (newAuthor: Author) => {
    setAuthors([newAuthor, ...authors]);
  };

  if (loading)
    return <Loader2Icon className="animate-spin h-10 w-10 mx-auto" />;

  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="flex flex-row gap-8">
        <AuthorsSideBar
          onAddAuthor={handleAddAuthor}
          onFilterAuthors={fetchAuthors}
        />
        <AuthorsList authors={authors} />
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default AuthorsView;
