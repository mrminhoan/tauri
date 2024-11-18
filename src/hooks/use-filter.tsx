import type { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

export function useFilterDataTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  return {
    columnFilters,
    onColumnFiltersChange: setColumnFilters,
  };
}
