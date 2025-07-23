import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeaders } from "../utils/setHeaders";
import { BASE_URL } from "../constants";

type T_user = {
  id: string;
  email: string;
  name?: string;
  last_name?: string;
  is_completed: boolean;
  birthday: string;

  next_step: 'identification' | 'income_and_taxes' | 'biometric_validation';
};

const IDENTIFICATION_USER_STEP = "identification";
const BIOMETRIC_VALIDATION_USER_STEP = "biometric_validation";
const INCOME_AND_TAXES_USER_STEP = "income_and_taxes";

export const userStepsUrls = {
  [IDENTIFICATION_USER_STEP]: "/profile/identification",
  [BIOMETRIC_VALIDATION_USER_STEP]: "/profile/biometric-validation",
  [INCOME_AND_TAXES_USER_STEP]: "/profile/income-and-taxes",
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/user`,
    prepareHeaders: setAuthHeaders,
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

export const {
  useUpdateUserMutation,
  useGetUserQuery,
  useLazyGetUserQuery
} = userApi;
