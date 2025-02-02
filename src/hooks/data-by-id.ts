import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import * as API from "@/constants/api";
import request from "@/services";

const fetchData = async <T>(id: string): Promise<T> => {
  const response = await request.get(`${API.DOMAIN}/api/companies/get/${id}`);
  return response.data;
};

export const useGetDataById = <T>(
  id: string | undefined,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<T, Error>({
    queryKey: ["company", id],
    queryFn: () => fetchData<T>(id!),
    enabled: !!id,
    ...options,
  });
};
