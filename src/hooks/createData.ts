import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import * as API from "@/constants/api";

type FormDataParams<T> = {
  newData: T;
  key: string;
};

const formData = async <T>({ newData, key }: FormDataParams<T>): Promise<T> => {
  const res = await request.post(`${API.DOMAIN}/api/${key}`, newData);
  return res.data as T;
};

export const useCreateData = <T>(key: string) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, FormDataParams<T>>({
    mutationFn: (params) => formData(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: (error) => {
      console.error("Error creating data:", error);
    },
  });
};
