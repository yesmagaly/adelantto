import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CREATE_authHeaders } from "../utils/createAuthHeaders";
import { BASE_URL } from "../constants";

type T_user = {
  id: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/user`,
    prepareHeaders: CREATE_authHeaders,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<T_user, void>({
      query: () => "",
      providesTags: (_post, _err) => [{ type: "User", id: _post?.id }],
    }),

    updateUser: builder.mutation<T_user, any>({
      query: (body) => ({
        url: "",
        method: "PUT",
        body,
      }),
      invalidatesTags: (_post, _error) => [{ type: "User", id: _post?.id }],
    }),
  }),
});

export const { useUpdateUserMutation, useLazyGetUserQuery } = userApi;
