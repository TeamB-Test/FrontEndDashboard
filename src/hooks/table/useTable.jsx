import { useQuery } from "@tanstack/react-query";
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
