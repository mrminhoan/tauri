import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";
import SelectCustom from "../select";
type IProps<TData> = {
  tableLib: Table<TData>;
};
const PageSizeList = [10, 20, 30, 40, 50];
function PaginationControl<TData>(props: IProps<TData>) {
  const { tableLib } = props;
  return (
    <div className="mt-5 flex items-center justify-end gap-3">
      <SelectCustom
        value={tableLib.getState().pagination.pageSize}
        options={PageSizeList.map((item) => ({
          text: item.toString(),
          value: item,
        }))}
        className="w-[100px]"
        onValueChange={(e) =>tableLib.setPageSize(e)}
      />
      <Button
        variant={"secondary"}
        size={"sm"}
        disabled={!tableLib.getCanPreviousPage()}
        onClick={() => tableLib.firstPage()}
      >
        {"<<"}
      </Button>
      <Button
        variant={"secondary"}
        size={"sm"}
        disabled={!tableLib.getCanPreviousPage()}
        onClick={() => tableLib.previousPage()}
      >
        {"<"}
      </Button>

      <span>
        Page <strong>{tableLib.getState().pagination.pageIndex + 1}</strong>
        <span> of {tableLib.getPageCount()}</span>
      </span>

      <Button
        variant={"secondary"}
        size={"sm"}
        disabled={!tableLib.getCanNextPage()}
        onClick={() => tableLib.nextPage()}
      >
        {">"}
      </Button>
      <Button
        variant={"secondary"}
        size={"sm"}
        disabled={!tableLib.getCanNextPage()}
        onClick={() => tableLib.lastPage()}
      >
        {">>"}
      </Button>
    </div>
  );
}

export default PaginationControl;
