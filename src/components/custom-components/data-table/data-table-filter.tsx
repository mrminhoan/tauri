import { useFilterDataTable } from "@/hooks/use-filter";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ColumnFiltersState } from "@tanstack/react-table";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

interface IProps {
  handleFilter: (e: ColumnFiltersState) => void;
}

function DataTableFilterFaced(props: IProps) {
  const { handleFilter } = props;
  const { onColumnFiltersChange } = useFilterDataTable();

  function onSubmit(values: any) {
    const filterValues: ColumnFiltersState = [];
    Object.keys(values).map((key) => {
      if (values[key]) {
        filterValues.push({
          id: key,
          value: values[key],
        });
      }
    });
    handleFilter(filterValues);
  }
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    },
  });

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-5"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="first name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Age" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="self-end">
            Filter
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default DataTableFilterFaced;
