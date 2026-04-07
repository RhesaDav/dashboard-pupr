"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState, useMemo } from "react";
import { DeleteUserDialog } from "./delete-user-dialog";
import { User } from "@/generated/prisma";
import EditUserDialog from "./edit-user-dialog";
import { ArrowUpDown, Eye, Search } from "lucide-react";
import UserAccessibilitySheet from "./user-accessibility-sheet";
import CreateUserDialog from "./create-user-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/actions/user";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

function UserManagementTable() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const queryParams = useMemo(() => {
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    return {
      search: search.trim(),
      page: page > 0 ? page : 1,
      pageSize: pageSize > 0 ? pageSize : 10,
    };
  }, [searchParams]);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [
      "users",
      queryParams.page,
      queryParams.pageSize,
      queryParams.search,
    ],
    queryFn: async () =>
      await getAllUsers({
        page: queryParams.page,
        limit: queryParams.pageSize,
        search: queryParams.search,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false
  });

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            aria-label="Sort by name"
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
      cell: ({ row }) => {
        return (
          <a
            href={`mailto:${row.original.email}`}
            className="text-primary hover:underline"
            aria-label={`Send email to ${row.original.email}`}
          >
            {row.original.email}
          </a>
        );
      },
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
              roleColorMap[role || ""] || "bg-gray-100 text-gray-800"
            }`}
            aria-label={`Role: ${role || "N/A"}`}
          >
            {role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : "N/A"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2" aria-label="User actions">
            <DeleteUserDialog
              userId={user.id}
              userName={user.name || ""}
              aria-label={`Delete user ${user.name}`}
              disabled={currentUser.user?.role !== "SUPERADMIN"}
            />
            <EditUserDialog user={user} aria-label={`Edit user ${user.name}`} />
            <UserAccessibilitySheet
              user={user}
              aria-label={`Manage access for ${user.name}`}
            />
          </div>
        );
      },
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value.trim();

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleResetFilter = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("pageSize", queryParams.pageSize.toString());
    router.push(`?${params.toString()}`);
  };

  console.log("Query params:", queryParams);
  console.log("Is loading:", isLoading);
  console.log("Error:", error);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola pengguna sistem dan aksesnya
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={handleSearch}
              placeholder="Search users..."
              className="pl-9 w-full"
              aria-label="Search users"
              defaultValue={queryParams.search}
            />
          </div>
          <CreateUserDialog />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.users || []}
        isLoading={isLoading}
        totalItems={data?.pagination?.total || 0}
        noDataMessage="No users available"
        noFilteredDataMessage="No users match your search criteria"
        filterActive={!!queryParams.search}
        onResetFilter={handleResetFilter}
        tableName="user"
        aria-label="User management table"
      />
    </div>
  );
}

export default UserManagementTable;
