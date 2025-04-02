import { useState } from "react";

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState<number>(initialPage);
  const [maxPage, setMaxPage] = useState<number>(1);

  return { page, maxPage, setMaxPage, setPage };
};
