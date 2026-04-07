import { getAllContracts } from "@/actions/contract";
import { Addendum, Contract, FinancialProgress, PhysicalProgress, Location } from "@/generated/prisma";
import { useEffect, useState } from "react";

interface FilterProps {
  page: number;
  pageSize: number;
  search: string;
}

interface UseContractResult {
  data: GetAllContractsResponse | undefined;
  loading: boolean;
  error: string | undefined;
  total: number;
  pageCount: number;
}

interface ContractPagination {
  total: number;
  page: number;
  limit: number;
  pageCount: number;
}

interface ExtendedContract extends Contract {
  addendum?: Addendum[];
  location?: Location | null;
  physicalProgress?: PhysicalProgress[];
  financialProgress?: FinancialProgress | null;
}

interface GetAllContractsResponse {
  success: boolean;
  data: ExtendedContract[];
  pagination: ContractPagination;
}

const useContract = ({ page, pageSize, search }: FilterProps): UseContractResult => {
  const [data, setData] = useState<GetAllContractsResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const response = await getAllContracts({
          page,
          limit: pageSize,
          search,
        });

        if (response) {
          setData(response);
          setTotal(response.pagination.total);
          setPageCount(response.pagination.pageCount);
        } else {
          setError("Gagal memuat data kontrak");
        }
      } catch (err: any) {
        setError(err?.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [page, pageSize, search]);

  return { data, loading, error, total, pageCount };
};

export default useContract;
