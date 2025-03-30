"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
import { DeleteUserDialog } from "./delete-user-dialog";
import { toast } from "sonner";
import { getAllUsers } from "@/actions/user";
import { User } from "@prisma/client";
import EditUserDialog from "./edit-user-dialog";

interface UserManagementTableTypes {
  users?: User[];
}

function UserManagementTable({ users }: UserManagementTableTypes) {
  const [loading, setLoading] = useState(true);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <LuArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return row.original.name || "-";
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;

    const roleColorMap: Record<string, string> = {
      ADMIN: "bg-green-100 text-green-800",
      SUPERADMIN: "bg-blue-100 text-blue-800",
      USER: "bg-red-100 text-red-800",
      CONSULTANT: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          roleColorMap[role] || "bg-gray-100 text-gray-800"
        }`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
      </span>
    );

      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <DeleteUserDialog userId={user.id} userName={user.name || ""} />
            <EditUserDialog user={user} />
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users || []}
      searchKey="name"
      pageSizeOptions={[5, 10, 20, 50]}
      defaultPageSize={10}
    />
  );
}

export default UserManagementTable;
