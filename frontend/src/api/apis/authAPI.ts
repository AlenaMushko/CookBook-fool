import { API_ROUTES } from "@api/apiRoutes";
import {
  ICreateUserReq,
  ISignUpRes,
  IValidateTokenRes,
} from "@api/types/auth.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { useAuthStore } from "@stores/authStore";

import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUpRes, ICreateUserReq>({
      query: (userData) => ({
        url: API_ROUTES.AUTH.SIGN_UP,
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        const { accessToken, refreshToken } = data.data;
        useAuthStore.getState().setTokens(accessToken, refreshToken);
      },
    }),
    validateToken: builder.query<IValidateTokenRes, void>({
      query: () => ({
        url: API_ROUTES.AUTH.VALIDATE_TOKEN,
        method: "GET",
      }),
    }),
  }),
});

export const { useSignUpMutation, useValidateTokenQuery } = authAPI;
