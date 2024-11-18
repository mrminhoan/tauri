import type { SortingState } from "@tanstack/react-table";
import { useState } from "react";

export function useSorting(initialField = "id", initialOrder = "DESC") {
  const [sorting, setSorting] = useState<SortingState>([]);
  return {
    sorting,
    onSortingChange: setSorting,
  };
}
