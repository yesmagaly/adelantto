import { useQuery } from "./hooks/useQuery";
import { getInstallment } from "./api";

export const useGetInstallmentQuery = (options?: any) =>
  useQuery(getInstallment, options);
