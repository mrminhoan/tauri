import type { EmployeeType } from "@/models";
import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<EmployeeType>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
    enableSorting: false,
    columns: [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
    ],
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
  },
  {
    accessorKey: "address",
    header: "Address",
    enableSorting: false,
    columns: [
      {
        accessorKey: "address.address",
        header: "Address",
        enableSorting: false,
      },
      {
        accessorKey: "address.city",
        header: "City",
        enableSorting: false,
      },
      {
        accessorKey: "address.state",
        header: "State",
        enableSorting: false,
      },
    ],
  },
  {
    accessorKey: "",
    header: "Action",
    enableSorting: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Detail</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
