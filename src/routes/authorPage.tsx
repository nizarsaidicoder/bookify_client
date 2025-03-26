import { useParams } from "react-router";
import { get_author } from "@/api/author";
import { useEffect, useState } from "react";
import { Author } from "@types";
import { Loader2 } from "lucide-react";
import { Button } from "@components/ui/button";
import AuthorUpdate from "@components/author/AuthorUpdate";
import { delete_author } from "@/api/author";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function AuthorPage() {
  const author_id = Number(useParams().author_id);
  const [author, setAuthor] = useState<Author>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const fetchedAuthor = await get_author(author_id);
        setAuthor(fetchedAuthor);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthor();
  }, [author_id]);

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
      {author ? (
        <div className="flex items-start gap-4 w-full h-[98vh] p-4  rounded-md border border-gray-200">
          {/* if image is loading display Skeleton */}
          <div className="flex flex-col min-w-40 gap-2 ">
            <img
              src={
                author.image ||
                `https://api.dicebear.com/7.x/lorelei/svg?seed=${
                  author.firstname
                }${author.lastname}${Math.floor(Math.random() * 10000)}`
              }
              alt={`${author.firstname} ${author.lastname}`}
              className=" object-cover rounded-md"
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
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-3xl font-bold">
              {author.firstname} {author.lastname}
            </h1>
            <h2 className="text-xl font-semibold">
              {author.birthYear} - {author.deathYear}
            </h2>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Biography</h2>
              <div className=" w-full custom-scroll text-md max-h-70 bg-gray-200 p-4 rounded-sm">
                {author.bio || "No bio available"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-10 h-10 animate-spin  " />
        </div>
      )}
    </>
  );
}

export default AuthorPage;
