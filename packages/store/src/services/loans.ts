import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";
import { T_installment } from "../../../../src/types";

export type T_loan = {
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

  installments: Array<T_installment>;
};

export const loansApi = createApi({
  reducerPath: "loansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/loans`,
    prepareHeaders: setAuthHeaders,
  }),
  tagTypes: ["Loans"],
  endpoints: (builder) => ({
    getLoans: builder.query<Array<T_loan>, void>({
      query: () => "",
      providesTags: (_loan, _err) => [{ type: "Loans", id: "LIST" }],
    }),

    getLoan: builder.query<T_loan, string>({
      query: (id) => `${id}`,
      providesTags: (loan, _err) => [{ type: "Loans", id: loan?.id }],
    }),
  }),
});

export const { useGetLoansQuery, useGetLoanQuery } = loansApi;
