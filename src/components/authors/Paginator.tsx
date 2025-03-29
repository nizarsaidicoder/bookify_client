import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginatorProps {
  page: number;
  maxPage: number;
  onPageChange: (page: number) => void;
}

function Paginator({ page, maxPage, onPageChange }: PaginatorProps) {
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > maxPage) return;
    onPageChange(newPage);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
            className="cursor-pointer"
          />
        </PaginationItem>
        {Array.from({ length: Math.min(5, maxPage) }, (_, i) => {
          // Calculate the starting page, ensuring we don't go below 1 or above maxPage-4
          const startPage = Math.max(1, Math.min(page - 2, maxPage - 4));
          const pageNumber = startPage + i;

          return (
            <PaginationItem
              key={pageNumber}
              className="cursor-pointer">
              <PaginationLink
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
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginator;
