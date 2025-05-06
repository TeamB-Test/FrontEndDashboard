import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../../lib/Instances/AxiosInstance";

// Get all categories
export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await Axios.get("/category");
      return response.data;
    },
  });
};

// Create category (multipart/form-data)
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await Axios.post("/category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

// Update category (multipart/form-data)
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await Axios.patch(`/category/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

// Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await Axios.delete(`/category/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
