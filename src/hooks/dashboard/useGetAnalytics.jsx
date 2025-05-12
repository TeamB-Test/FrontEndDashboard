// hooks/useGetAnalytics.ts
import { useQuery } from "@tanstack/react-query";
import Axios from "../../lib/Instances/AxiosInstance"; // adjust this if needed

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const response = await Axios.get("/analytics");
      return response.data.data; // access the "data" property from the API
    },
  });
};
