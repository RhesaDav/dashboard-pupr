"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { DeleteUserDialog } from "./delete-user-dialog";
import { User } from "@prisma/client";
import EditUserDialog from "./edit-user-dialog";
import {
  Accessibility,
  AccessibilityIcon,
  ArrowUpDown,
  Eye,
} from "lucide-react";
import UserAccessibilitySheet from "./user-accessibility-sheet";
import CreateUserDialog from "./create-user-dialog";
import { useRouter, useSearchParams } from "next/navigation";

interface UserManagementTableTypes {
  users?: User[];
}

function UserManagementTable({ users }: UserManagementTableTypes) {
  const router = useRouter();
  const searchParams = useSearchParams()
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <UserAccessibilitySheet user={user} />
          </div>
        );
      },
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set("search", e.target.value);
      router.push(`?${params.toString()}`);
    };

  return (
    <DataTable
      additionalButton={<CreateUserDialog />}
      columns={columns}
      data={users || []}
      searchKey="name"
      onSearch={handleSearch}
      pageSizeOptions={[5, 10, 20, 50]}
      defaultPageSize={10}
    />
  );
}

export default UserManagementTable;
