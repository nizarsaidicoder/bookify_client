import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import BookCard from "@components/book/BookCard";
import { BookBase } from "@types";

interface BooksCarouselProps {
  books: BookBase[];
  show?: number;
}

function BooksCarousel({ books, show = 3 }: BooksCarouselProps) {
  if (!books.length) return null;
  if (books.length < show) show = books.length;
  return (
    <Carousel className="w-[90%] mx-auto">
      <CarouselContent className="-ml-1 w-full">
        {books.map((book) => (
          <CarouselItem
            className={`w-1 px-1`}
            style={{ flexBasis: `${100 / show}%` }}
            key={book.id}>
            <BookCard
              id={book.id}
              title={book.title}
              cover={book.cover}
              publicationYear={book.publicationYear}
              rating={book.avgRating}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-8" />
      <CarouselNext className="mr-4" />
    </Carousel>
  );
}

export default BooksCarousel;
