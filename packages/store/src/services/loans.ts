import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setAuthHeaders";
import { BASE_URL } from "../constants";

export type T_loan_item = {
  id: string;
  amount: number;
  status: string;
  missing_installments_counter: number;
  paid_amount: number;
  missing_installment?: {
    id: number;
    amount: number;
    due_date: string;
  };
};

export const loansApi = createApi({
  reducerPath: "loansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/loans`,
    prepareHeaders: setAuthHeaders,
  }),
  tagTypes: ["Loans"],
  endpoints: (builder) => ({
    getLoans: builder.query<Array<T_loan_item>, void>({
      query: () => "",
      providesTags: (_loan, _err) => [{ type: "Loans", id: "LIST" }],
    }),
  }),
});

export const { useGetLoansQuery } = loansApi;
