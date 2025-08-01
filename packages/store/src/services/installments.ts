import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";
import { T_installment } from "../../../../src/types";

export const installmentsApi = createApi({
  reducerPath: "installmentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/installments`,
    prepareHeaders: setAuthHeaders,
  }),
  tagTypes: ["Installments"],
  endpoints: (builder) => ({
    getInstallment: builder.query<T_installment, string>({
      query: (id) => `${id}`,
      providesTags: (loan, _err) => [{ type: "Installments", id: loan?.id }],
    }),

    uploadInstallmentFile: builder.mutation<T_installment, any>({
      query: ({id, ...body}) => ({
        url: `${id}/upload-file`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetInstallmentQuery, useUploadInstallmentFileMutation } = installmentsApi;
