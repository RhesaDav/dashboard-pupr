import { getAllUsers } from "@/actions/user";
import { User } from "@/generated/prisma";
import { useEffect, useState } from "react";

interface FilterProps {
  page: number;
  pageSize: number;
  search: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface GetAllUsersSuccessResponse {
  success: boolean;
  users?: User[];
  pagination?: Pagination;
  error?: string;
}

interface UseUsersResult {
  data: GetAllUsersSuccessResponse | undefined;
  loading: boolean;
  error: string | undefined;
  total: number;
  pageCount: number;
}

const useUsers = ({ page, pageSize, search }: FilterProps): UseUsersResult => {
  const [data, setData] = useState<GetAllUsersSuccessResponse | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const response = await getAllUsers({
          page,
          limit: pageSize,
          search,
        });

        if (response.success) {
          setData(response);
          setTotal(response.pagination?.total || 0);
          setPageCount(response.pagination?.totalPages || 0);
        } else {
          setError(response.error || "Gagal memuat data pengguna");
        }
      } catch (err: any) {
        setError(err?.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize, search]);

  return { data, loading, error, total, pageCount };
};

export default useUsers;
