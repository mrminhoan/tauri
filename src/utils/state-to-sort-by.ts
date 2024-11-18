import type { SortingState } from "@tanstack/react-table";

export function mapperStateToSortBy(sortState: SortingState | undefined) {
  if (!sortState || !sortState.length) return undefined;
  const sort = sortState[0];
  
  // return `sortBy=${sort.id}&order=${sort.desc ? "desc" : "asc"}` as const
  return {
    sortBy: sort.id,
    order: sort.desc ? "desc" : "asc",
  };
}
