import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
  type PaginationState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import PaginationControl from "../pagination";
import { ArrowDown01, ArrowDown10, ArrowDownUp } from "lucide-react";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSortingChange: OnChangeFn<SortingState>;
  sorting: SortingState | undefined;
  onPaginationChange: OnChangeFn<PaginationState>;
  pagination: PaginationState;
  rowCount: number;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
}

function DataTable<TData, TValue>({
  columns,
  data,
  onSortingChange,
  sorting,
  onPaginationChange,
  pagination,
  rowCount,
  columnFilters,
  onColumnFiltersChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange,
    onPaginationChange,
    onColumnFiltersChange,

    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    rowCount,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  return (
    <>
      <div className="rounded-md border">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                          className={`${
                            header.column.getCanSort() ? "cursor-pointer" : ""
                          } flex gap-3`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {{
                            asc: <ArrowDown01 size={18} strokeWidth={1} />,
                            desc: <ArrowDown10 size={18} strokeWidth={1} />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ArrowDownUp size={16} strokeWidth={1} />
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControl tableLib={table} />
    </>
  );
}
export default DataTable;
