import BooksCarousel from "@components/book/BooksCarousel";
import LoadingIndicator from "@components/ui/loading-indicator";
import { useBookSuggestions } from "@hooks/book/useBookSuggestions";

interface BookSuggestionsProps {
  id: number;
}
function BookSuggestions({ id }: BookSuggestionsProps) {
  const { suggestions, loading, error } = useBookSuggestions(id);

  if (loading) return <LoadingIndicator />;
  if (error) return <p>{error}</p>;
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">You Might Also Like</h2>
      <BooksCarousel
        books={suggestions}
        show={4}
      />
    </div>
  );
}

export default BookSuggestions;
