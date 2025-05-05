import DataContractTable from "./_components/data-contract-table";
import Pagination from "@/components/ui/pagination";
import { getAllContracts } from "@/actions/contract";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <DataContractTable />;
}
