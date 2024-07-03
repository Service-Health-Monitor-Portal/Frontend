import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios.config";
import { AxiosRequestConfig } from "axios";

interface IAuthQuery {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig;
    pollInterval?: number;
}

const useCustomQuery = ({queryKey, url, config, pollInterval}: IAuthQuery) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
          const {data} = await axiosInstance.get(url, config);
          return data;
        },
        refetchInterval: pollInterval,
      })
}

export default useCustomQuery;