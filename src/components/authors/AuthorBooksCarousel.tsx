import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import BookCard from "@components/book/BookCard";
import { BookBase } from "@types";

interface AuthorBooksCarouselProps {
  books: BookBase[];
}

function AuthorBooksCarousel({ books }: AuthorBooksCarouselProps) {
  return (
    <Carousel className="w-full max-w-xl">
      <CarouselContent className="-ml-1">
        {books.map((book) => (
          <CarouselItem
            className="pl-4 md:basis-1/2 lg:basis-1/2"
            key={book.id}>
            <BookCard
              title={book.title}
              cover={book.cover}
              publicationYear={book.publicationYear}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default AuthorBooksCarousel;
