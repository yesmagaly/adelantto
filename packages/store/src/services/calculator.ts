import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CREATE_authHeaders } from "../utils/createAuthHeaders";
import { BASE_URL } from "../constants";

type T_offer = {
  id: string;
  advance: number;
  fees: number;
  iva_commission: number;
  principal: number;
};

export const calculatorApi = createApi({
  reducerPath: "calculatorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/calc`,
    prepareHeaders: CREATE_authHeaders,
  }),
  tagTypes: ["Offer"],
  endpoints: (builder) => ({
    getOffer: builder.query<T_offer, { principal: number; months: number }>({
      query: ({ principal, months }) =>
        `?principal=${principal}&months=${months}`,
      providesTags: (_post, _err, args) => [
        { type: "Offer", id: `${args.principal}:${args.months}` },
      ],
    }),
  }),
});

export const { useLazyGetOfferQuery } = calculatorApi;
