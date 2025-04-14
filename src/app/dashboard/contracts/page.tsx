import DataContractTable from "./_components/data-contract-table";
import Pagination from "@/components/ui/pagination";
import { getAllContracts } from "@/actions/contract";

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
    <div className="">
      <h1 className="text-2xl font-bold mb-5">Data Contract</h1>
      <DataContractTable contracts={contracts.contracts} />
      <Pagination totalPages={contracts.pagination?.totalPages} />
    </div>
  );
}
