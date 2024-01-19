import type { ColumnDef } from "@tanstack/react-table";
import type { Database } from "schemas";

export const columns: ColumnDef<Database>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "db_type",
    header: "Database Type",
  },
  {
    accessorKey: "worker_url",
    header: "Worker URL",
  },
];
