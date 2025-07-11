import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";
import { FieldErrors, FieldValues } from "react-hook-form";

type T_user = {
  id: string;
  name?: string;
  phone?: string;
  last_name?: string;
  is_completed: boolean;
};

type T_error_respose<T extends FieldValues> = {
  status: "fail";
  message: string;
  errors: Partial<Record<keyof FieldErrors<T>, string[]>>;
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

    loginUser: builder.mutation<T_user, { email: string; password: string }>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: (_post, _error) => [{ type: "User", id: _post?.id }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.error("data:", data);
          // localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
          console.error("Failed to save user to local storage:", error);
        }
      },
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
  useLoginUserMutation,
  useRecoverPasswordMutation
} = authApi;
