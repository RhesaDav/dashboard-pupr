import React from 'react'
import ReportTable from './_components/report-table';
import Pagination from '@/components/ui/pagination';
import { getAllContracts } from '@/actions/contract';
import { getAllProgress } from '@/actions/progress';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const page = Number((await searchParams).page || 1);
  const pageSize = Number((await searchParams).pageSize || 10);
  const search = String((await searchParams).search || "");
  // const contracts = await getAllContracts(page,pageSize,search)
  const progress = await getAllProgress({
    startDate: '2025-02-10',
  endDate: '2025-04-07',
  })
  return (
      <ReportTable />
  );
}