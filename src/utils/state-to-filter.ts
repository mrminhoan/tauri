import type { ColumnFiltersState } from "@tanstack/react-table";

export function mapperStateToFilter(filter: ColumnFiltersState) {
  return filter
    .map(
      (item: any) =>
        `/filter?key=${encodeURIComponent(item.id)}&value=${encodeURIComponent(
          item.value
        )}`
    )
    .join("&");
}