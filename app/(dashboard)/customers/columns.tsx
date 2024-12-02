"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Customer = {
  id: string;
  name: string;
};

export const payments: Customer[] = [
  {
    id: "728ed52f",
    name: "m@example.com",
  },
  {
    id: "489e1d42",
    name: "m@example.com",
  },
];

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Email",
  },
];
