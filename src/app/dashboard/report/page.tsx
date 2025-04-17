import React from 'react'
import ReportTable from './_components/report-table';
import Pagination from '@/components/ui/pagination';
import { getAllContracts } from '@/actions/contract';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const page = Number((await searchParams).page || 1);
  const pageSize = Number((await searchParams).pageSize || 10);
  const search = String((await searchParams).search || "");
  const contracts = await getAllContracts(page,pageSize,search)
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Report</h1>
      <ReportTable contracts={contracts.contracts} />
      <Pagination totalPages={contracts.pagination?.totalPages} />
    </div>
  );
}