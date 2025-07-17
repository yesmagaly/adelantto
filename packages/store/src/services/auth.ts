import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";

type T_user = {
  id: string;
  name?: string;
  phone?: string;
  last_name?: string;
  is_completed: boolean;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth`,
    prepareHeaders: setAuthHeaders,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<T_user, any>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      invalidatesTags: (_post, _error) => [{ type: "User", id: _post?.id }],
    }),

    recoverPassword: builder.mutation<T_user, { email: string }>({
      query: (body) => ({
        url: "/recover-password",
        method: "POST",
        body,
      }),
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useRecoverPasswordMutation
} = authApi;
