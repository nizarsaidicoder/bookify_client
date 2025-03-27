import { useParams, Link } from "react-router";
import { useBook } from "@/hooks/useBook";
import { Badge } from "@/components/ui/badge";

function BookPage() {
  const { book_id } = useParams();
  const { book, author, loading } = useBook(book_id);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!book) return <p className="text-center mt-10">Book not found.</p>;

  const tagColors = [
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-red-200 text-red-800",
    "bg-yellow-200 text-yellow-800",
    "bg-purple-200 text-purple-800",
    "bg-pink-200 text-pink-800",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold">{book.title}</h1>

      {(book.tags ?? []).length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {book.tags?.map((tag, index) => (
            <Badge
              key={tag.id}
              className={`${
                tagColors[index % tagColors.length]
              } px-3 py-1 rounded-md`}>
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-6">
        <div className="w-48 flex-shrink-0">
          <img
            src={book.cover ?? "https://via.placeholder.com/150"}
            alt={book.title}
            className="w-full h-auto rounded-md shadow"
          />
        </div>

        <div className="flex-1">
          {author && (
            <h2 className="text-lg text-gray-600">
              by{" "}
              <Link
                to={`/authors/${author.id}`}
                className="text-blue-600 hover:underline">
                {author.firstname} {author.lastname}
              </Link>
            </h2>
          )}
          <p className="text-sm text-gray-500">
            Published in {book.publicationYear}
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="mt-2 text-gray-700">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
