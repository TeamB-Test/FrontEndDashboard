import { useMutation } from "@tanstack/react-query";
import Axios from "../../lib/Instances/AxiosInstance";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (registerData) => {
      const response = await Axios.post("/auth/registerWithResturant", registerData);
      return response.data;
    },
  });
};
