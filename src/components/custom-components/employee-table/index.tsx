import type { EmployeeType } from "@/models";
import DataTable from "../data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { employeeData } from "@/data/employe-data";
import { UserService } from "@/service";
import { useSorting } from "@/hooks/use-sorting";
import { usePagination } from "@/hooks/use-pagination";
import { useFilterDataTable } from "@/hooks/use-filter";
import DataTableFilterFaced from "../data-table/data-table-filter";
import type { ColumnFiltersState } from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";

function EmployeeList() {
  const [data, setData] = useState<EmployeeType[]>(employeeData);
  const [rowCount, setRowCount] = useState<number>(0);

  const { sorting, onSortingChange } = useSorting();
  const { pagination, onPaginationChange, limit, skip } = usePagination();
  const { columnFilters, onColumnFiltersChange } = useFilterDataTable();
  useEffect(() => {
    UserService.getListUser({
      sorting,
      pagination: { limit, skip },
      filter: columnFilters,
    }).then((res: any) => {
      setData(res.users);
      setRowCount(res.total);
    });
  }, [sorting, pagination, columnFilters]);

  const handleFilter = (e: ColumnFiltersState) => {
    console.log(e);
    toast(JSON.stringify(e));
  };

  return (
    <div>
      <DataTableFilterFaced handleFilter={handleFilter} />
      <div className="mt-5">
        <DataTable
          columns={columns}
          data={data}
          sorting={sorting}
          onSortingChange={onSortingChange}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
          rowCount={rowCount}
          columnFilters={columnFilters}
          onColumnFiltersChange={onColumnFiltersChange}
        />
      </div>
    </div>
  );
}

export default EmployeeList;
