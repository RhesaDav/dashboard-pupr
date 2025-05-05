import React from 'react'
import ProgressTable from './_components/progress-table';
import SearchInput from './_components/search-input';
import Pagination from '@/components/ui/pagination';
import { getAllContracts } from '@/actions/contract';

export default async function page({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) {
    return (
        <ProgressTable />
    );
  }