import React from "react";
import SearchInput from "./_components/search-input";
import Pagination from "@/components/ui/pagination";
import { getAllContracts } from "@/actions/contract";
import FinancialProgressTable from "./_components/financial-progress-table";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <FinancialProgressTable />;
}
