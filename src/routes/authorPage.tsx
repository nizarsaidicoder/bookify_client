import { useParams } from "react-router";
import { useAuthor } from "@/hooks/useAuthor";
import { Loader2 } from "lucide-react";
import { Button } from "@components/ui/button";
import AuthorUpdate from "@components/authors/AuthorUpdate";
import { delete_author } from "@/api/author";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import AuthorBooksCarousel from "@components/authors/AuthorBooksCarousel";
import AuthorBookAddForm from "@components/author/AuthorBookAddForm";
import { Book } from "@types";

function AuthorPage() {
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
      return navigate("/authors");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : author ? (
        <div className="flex gap-4 w-full">
          <AuthorBookAddForm
            authorId={author_id}
            onAddBook={handleOnBookAdd}
          />
          {/* Author Info Container */}
          <div className="flex flex-col items-center gap-4 w-full overflow-hidden p-4 rounded-md border border-gray-200">
            {/* Left Column: Image and Controls */}
            <div className="flex min-w-40 gap-2">
              <div className="flex flex-col min-w-40 gap-2">
                <img
                  src={
                    author.image ||
                    `https://api.dicebear.com/7.x/lorelei/svg?seed=${
                      author.firstname
                    }${author.lastname}${Math.floor(Math.random() * 10000)}`
                  }
                  alt={`${author.firstname} ${author.lastname}`}
                  className="object-cover rounded-md w-40 h-40"
                />
                <AuthorUpdate
                  author={author}
                  onAuthorUpdate={setAuthor}
                />
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="mt-2">
                  Delete
                </Button>
              </div>

              {/* Right Column: Biography */}
              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-3xl font-bold">
                  {author.firstname} {author.lastname}
                </h1>
                <h2 className="text-xl font-semibold">
                  {author.birthYear} - {author.deathYear}
                </h2>
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold">Biography</h2>
                  <div className="w-full custom-scroll text-md max-h-[150px] overflow-auto bg-gray-200 p-4 rounded-sm">
                    {author.bio || "No bio available"}
                  </div>
                </div>
              </div>
            </div>
            <AuthorBooksCarousel books={author.books || []} />
          </div>
        </div>
      ) : (
        <p className="text-center mt-10">Author not found.</p>
      )}
    </>
  );
}

export default AuthorPage;
