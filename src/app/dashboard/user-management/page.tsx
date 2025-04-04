import React from "react";
import UserManagementTable from "./_components/user-management-table";
import CreateUserDialog from "./_components/create-user-dialog";
import SearchInput from "./_components/search-input";
import Pagination from "../../../components/ui/pagination";
import { getAllUsers } from "@/actions/user";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const page = Number((await searchParams).page || 1)
  const pageSize = Number((await searchParams).pageSize || 10)
  const search = String((await searchParams).search || "")
  const users = await getAllUsers(page,pageSize,search)
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <UserManagementTable users={users.users} />
      <Pagination totalPages={users.pagination?.totalPages} />
    </div>
  );
}

export default page;
