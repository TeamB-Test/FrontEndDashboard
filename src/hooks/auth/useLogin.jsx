import { useMutation } from "@tanstack/react-query";
import Axios from "../../lib/Instances/AxiosInstance";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginData) => {
      const response = await Axios.post("/auth/login", loginData);
      console.log("Login response:", response.data); // Log the response data
      return response.data;
    },
  });
};
