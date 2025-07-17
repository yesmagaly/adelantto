import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";

export type T_file = {
  id: number;
  name: string;
};

export type T_application = {
  id: string;
  lease_monthly_income: number;
  lease_start_date: string;
  lease_end_date: string;
  lease_payment_method: string;

  pre_offer_term_frame?: number;

  property_commercial_folio?: string;
  property_zip_code?: string;
  property_lease_agreement?: File | T_file;
  property_latest_tax_receipt?: File | T_file;

  next_step: "pre_offer" | "property_details";
};

const PRE_OFFER_STEP = "pre_offer";
const PROPERTY_DETAILS_STEP = "property_details";

export const applicationStepsUrls = {
  [PRE_OFFER_STEP]: "/desired-loan",
  [PROPERTY_DETAILS_STEP]: "/property-documents",
};

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/applications`,
    prepareHeaders: setAuthHeaders,
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
