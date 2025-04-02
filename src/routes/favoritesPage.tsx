import BooksList from "@components/book/BooksList";
import { useFavoriteBooks } from "@hooks/book/useFavoriteBooks";
function FavoritesStatus({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: string | null;
}) {
  if (isLoading) {
    return (
      <div className="text-center py-8">Loading your favorite books...</div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return null;
}

function FavoritesPage() {
  const { favoriteBooks, isLoading, error } = useFavoriteBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Books</h1>
      <FavoritesStatus
        isLoading={isLoading}
        error={error}
      />
      {!isLoading && !error && (
        <>
          {favoriteBooks.length > 0 ? (
            <BooksList books={favoriteBooks} />
          ) : (
            <p className="text-center py-8 text-gray-500">
              You haven't added any books to favorites yet.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default FavoritesPage;
