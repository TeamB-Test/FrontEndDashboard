import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/Instances/AxiosInstance"; // Adjust if you use a different Axios instance
import toast from "react-hot-toast";

// Get all foods
export const useGetAllFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await axios.get("/api/food");
      return response.data;
    },
  });
};

// Create a food
export const useCreateFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("/api/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Food created successfully!");
      queryClient.invalidateQueries(["foods"]);
    },
  });
};

// Update a food
export const useUpdateFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(`/api/food/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Food updated successfully!");
      queryClient.invalidateQueries(["foods"]);
    },
  });
};

// Delete a food
export const useDeleteFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`/api/food/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Food deleted successfully!");
      queryClient.invalidateQueries(["foods"]);
    },
  });
};
