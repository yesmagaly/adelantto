import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";

type T_offer = {
  id: string;
  advance: number;
  fees: number;
  iva_commission: number;
  principal: number;
};

type T_zipCode = {
  zip_code: string;
  state: string;
  municipality: string;
  city: string;
  place: string;
};

export const generalApi = createApi({
  reducerPath: "generalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: setAuthHeaders,
  }),
  tagTypes: ["Offer", "ZipCodes"],
  endpoints: (builder) => ({
    getOffer: builder.query<T_offer, { principal: number; months: number }>({
      query: ({ principal, months }) =>
        `/calc?principal=${principal}&months=${months}`,
      providesTags: (_post, _err, args) => [
        { type: "Offer", id: `${args.principal}:${args.months}` },
      ],
    }),

    checkZipCode: builder.query<T_zipCode, string>({
      query: (code) => `/zip-codes/${code}`,
      providesTags: (_post, _err, code) => [{ type: "ZipCodes", id: code }],
    }),
  }),
});

export const { useLazyGetOfferQuery, useLazyCheckZipCodeQuery } = generalApi;
