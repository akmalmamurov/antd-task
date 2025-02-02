import * as API from "@/constants/api";
import request from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFunction = async (id: string): Promise<any> => {
  await request.delete(`${API.DOMAIN}/api/companies/delete/by-id`, {
    data: id,
  });
};

export const useDeleteData = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies/get-all"] });
      console.log("Data deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting data:", error.message);
    },
  });
};
