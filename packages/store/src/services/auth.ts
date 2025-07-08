import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";
import { FieldErrors, FieldValues } from "react-hook-form";

type T_user = {
  id: string;
  name?: string;
  last_name?: string;
  is_completed: boolean;
};

type T_error_respose<T extends FieldValues> = {
  status: "fail";
  message: string;
  errors: Partial<Record<keyof FieldErrors<T>, string[]>>
}

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
  }),
});

export const { useRegisterUserMutation } = authApi;
