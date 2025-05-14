import React from "react";
import UserManagementTable from "./_components/user-management-table";
import CreateUserDialog from "./_components/create-user-dialog";
import SearchInput from "./_components/search-input";
import Pagination from "../../../components/ui/pagination";
import { getAllUsers } from "@/actions/user";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <UserManagementTable />;
}

export default page;
