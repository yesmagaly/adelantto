import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CREATE_authHeaders } from "../utils/createAuthHeaders";
import { BASE_URL } from "../constants";

export type T_application = {
  id: string;
  lease_monthly_income: number;
  lease_start_date: string;
  lease_end_date: string;
  lease_payment_method: string;

  desired_loan_term_frame?: number;
};

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/applications`,
    prepareHeaders: CREATE_authHeaders,
  }),
  tagTypes: ["Applications"],
  endpoints: (builder) => ({
    addApplication: builder.mutation<T_application, any>({
      query: (args) => ({
        url: "",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Applications"],
    }),

    getApplications: builder.query<Array<T_application>, void>({
      query: () => "",
      providesTags: (_loan, _err) => [{ type: "Applications", id: "LIST" }],
    }),

    getApplication: builder.query<T_application, string>({
      query: (id) => `/${id}`,
      providesTags: (_application, _err, id) => [{ type: "Applications", id }],
    }),

    updateApplication: builder.mutation<T_application, any>({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_application, _error) => [
        { type: "Applications", id: _application?.id },
      ],
    }),
  }),
});

export const {
  useAddApplicationMutation,
  useGetApplicationsQuery,
  useLazyGetApplicationQuery,
  useUpdateApplicationMutation,
} = applicationsApi;
