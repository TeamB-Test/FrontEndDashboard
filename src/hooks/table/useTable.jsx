import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../../lib/Instances/AxiosInstance";

export const useGetAllTables = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const response = await Axios.get("/table");
      return response.data;
    },
  });
};

export const useCreateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await Axios.post("/table", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tables"]);
    },
  });
};

export const useUpdateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await Axios.patch(`/table/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tables"]);
    },
  });
};

export const useDeleteTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await Axios.delete(`/table/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tables"]);
    },
  });
};
