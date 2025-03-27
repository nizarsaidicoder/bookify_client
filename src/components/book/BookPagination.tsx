import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BooksPaginationProps {
  page: number;
  maxPage: number;
  onPageChange: (page: number) => void;
}

function BooksPagination({
  page,
  maxPage,
  onPageChange,
}: BooksPaginationProps) {
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > maxPage) return;
    onPageChange(newPage);
  };
  return (
    <Pagination>
      <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(page - 1);
        }}
        />
      </PaginationItem>
      {Array.from({ length: Math.min(10, maxPage) }, (_, index) => {
        const pageNumber = Math.max(
        1,
        Math.min(page - 5 + index, maxPage - 9 + index)
        );
        return (
        <PaginationItem key={pageNumber}>
          <PaginationLink
          href="#"
          isActive={pageNumber === page}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(pageNumber);
          }}>
          {pageNumber}
          </PaginationLink>
        </PaginationItem>
        );
      })}
      <PaginationItem>
        <PaginationNext
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(page + 1);
        }}
        />
      </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default BooksPagination;
