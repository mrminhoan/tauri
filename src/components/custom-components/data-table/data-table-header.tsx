import type { Column, ColumnDef, SortingState } from "@tanstack/react-table";
import type { ReactNode } from "react";

interface IProps<TData> {
  column: Column<TData>;
  children: ReactNode;
}
function DataTableHeader<TData>(props: IProps<TData>) {
  const { column, children } = props;
  return <div>{children}</div>;
}

export default DataTableHeader;
