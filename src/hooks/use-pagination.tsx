import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export function usePagination() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { pageSize, pageIndex } = pagination;
  return {
    onPaginationChange: setPagination,
    pagination,
    limit: pageSize,
    page: pageIndex + 1,
    skip: pageSize * pageIndex,
  };
}
