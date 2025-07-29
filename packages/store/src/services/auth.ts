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
    login: builder.mutation<
      { token: string; user: T_user },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: (_response, _error) => [{ type: "User", id: "ITEM" }],
    }),

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

    resendVerificationCode: builder.mutation<T_user, string>({
      query: (id) => ({
        url: `/${id}/verification-code`,
        method: "PUT",
      }),
    }),

    verifyPhoneCode: builder.mutation<T_user, { id: string; code: string }>({
      query: ({ id, code }) => ({
        url: `/${id}/verify-phone-code`,
        method: "POST",
        body: { code },
      }),
      invalidatesTags: (_user, _error) => [{ type: "User", id: _user?.id }],
    }),

    updatePassword: builder.mutation<
      T_user,
      { current_password: string; password: string; confirm_password: string }
    >({
      query: (body) => ({
        url: `/password`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_user, _error) => [{ type: "User", id: "Item" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useRecoverPasswordMutation,
  useResendVerificationCodeMutation,
  useVerifyPhoneCodeMutation,
  useUpdatePasswordMutation,
} = authApi;
