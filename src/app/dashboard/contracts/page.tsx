import DataContractTable from "./_components/data-contract-table";
import Pagination from "@/components/ui/pagination";
import SearchInput from "./_components/search-input";
import { getAllContracts } from "@/actions/contract";

// export default function HomePage() {
//   return (
//     <div>
//       <ContractsPage />
//     </div>
//   );
// }

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
      <h1 className="text-2xl font-bold mb-5">Data Contract</h1>
      <SearchInput />
      <DataContractTable contracts={contracts.contracts} />
      <Pagination totalPages={contracts.pagination?.totalPages} />
    </div>
  );
}
