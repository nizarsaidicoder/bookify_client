import BooksList from "@components/book/BooksList";
import LoadingIndicator from "@components/ui/loading-indicator";
import { useFavoriteBooks } from "@hooks/book/useFavoriteBooks";
function FavoritesStatus({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: string | null;
}) {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return null;
}

function FavoritesPage() {
  const { favoriteBooks, isLoading, error } = useFavoriteBooks();

  return (
    <div className="h-[98vh] w-full">
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
