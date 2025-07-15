import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";

export type T_loan_item = {
  id: string;
  amount: number;
  status: string;

  summary: {
    total_paid_amount: number;
    missing_installments_counter: number;
    missing_installment?: {
      id: number;
      due_date: string;
      amount: number;
    };
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
