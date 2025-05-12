// src/hooks/order/useOrder.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/Instances/AxiosInstance"; // Make sure this instance includes your Authorization header

// GET all orders
export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get("/order");
      return res.data;
    },
  });
};

// CREATE a new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("/order", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

// UPDATE order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const formData = new FormData();
      formData.append("status", status);
      const res = await axios.patch(`/order/status/${id}`, formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

// DELETE an order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`/order/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};
