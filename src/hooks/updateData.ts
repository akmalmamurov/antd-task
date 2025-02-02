import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import * as API from "@/constants/api";

const updateFunction = async ({ id, newData }: { id: string; newData: any }): Promise<any> => {
  await request.put(`${API.DOMAIN}/api/companies/update`, { id, ...newData });
};

export const useUpdateData = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; newData: any }>({
    mutationFn: updateFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies/get-all"] });
      console.log("Data updated successfully");
    },
    onError: (error) => {
      console.error("Error updating data:", error.message);
    },
  });
};