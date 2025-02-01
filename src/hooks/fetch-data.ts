import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import * as API from "@/constants/api";
import request from "@/services";

type FetchDataParams = {
  key: string;
  queryParams?: Record<string, string | number>;
};

const fetchData = async <T>({ key, queryParams }: FetchDataParams): Promise<T> => {
  const response = await request.get<T>(`${API.DOMAIN}/api/${key}`, { params: queryParams });
  return response.data;
};

// Custom React Query hook
export const useGetData = <T>(
  key: string,
  queryParams?: Record<string, string | number>,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn"> // ✅ `onError` ni `options` orqali qo'shamiz
) => {
  return useQuery<T, Error>({
    queryKey: [key, queryParams],
    queryFn: () => fetchData<T>({ key, queryParams }),
    ...options, // ✅ Agar `onError` kerak bo'lsa, `options` orqali qo‘shish mumkin
  });
};
