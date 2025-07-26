import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";

export type T_article = {
  id: string;
  title: number;
};

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/articles`,
    prepareHeaders: setAuthHeaders,
  }),
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    getArticles: builder.query<Array<T_article>, void>({
      query: () => "",
      providesTags: (_loan, _err) => [{ type: "Articles", id: "LIST" }],
    }),
  }),
});

export const {
  useGetArticlesQuery,
} = articlesApi;
