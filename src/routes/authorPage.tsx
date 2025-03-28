import AuthorBookAddForm from "@components/author/AuthorBookAddForm";
import { useParams } from "react-router";
import { useAuthor } from "@/hooks/useAuthor";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Book } from "@types";
import { AuthorBio } from "@components/author/AuthorBio";
import { AuthorHeader } from "@components/author/AuthorHeader";
import { AuthorActions } from "@components/author/AuthorActions";
import { delete_author } from "@/api/author";
import BooksCarousel from "@components/authors/BooksCarousel";

export function AuthorPage() {
  const author_id = Number(useParams().author_id);
  const { author, setAuthor, loading } = useAuthor(author_id);
  const navigate = useNavigate();

  const handleOnBookAdd = (book: Book) => {
    if (!author) return;
    setAuthor({
      ...author,
      books: [...(author.books || []), book],
    });
  };

  const handleDelete = async () => {
    try {
      await delete_author(author_id);
      toast("Author deleted successfully");
      navigate("/authors");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!author) {
    return <p className="text-center mt-10">Author not found.</p>;
  }

  return (
    <div className="flex gap-4 w-full custom-scroll ">
      <AuthorBookAddForm
        authorId={author_id}
        onAddBook={handleOnBookAdd}
      />
      <div className="flex flex-col items-center h-[98vh] custom-scroll gap-4 w-full p-4 rounded-md border border-gray-200">
        <div className="flex min-w-40 gap-8 w-full h-full">
          <div className="flex flex-col min-w-54 gap-2">
            <AuthorHeader
              firstname={author.firstname}
              lastname={author.lastname}
              birthYear={
                author.birthDate
                  ? new Date(author.birthDate).getFullYear().toString()
                  : ""
              }
              deathYear={
                author.deathDate
                  ? new Date(author.deathDate).getFullYear().toString()
                  : ""
              }
              image={author.image || ""}
            />
            <AuthorActions
              author={author}
              onAuthorUpdate={setAuthor}
              onDelete={handleDelete}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Biography</h2>
              <AuthorBio bio={author.bio || ""} />
            </div>
            {(author.books?.length ?? 0) > 0 && (
              <BooksCarousel books={author.books || []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
