import { API_ROUTES } from "@api/apiRoutes";
import {
  ICreateUserReq,
  ISignUpRes,
  IValidateTokenRes,
} from "@api/types/auth.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { showToast } from "@shared/index";
import { useAppStore } from "@stores/zustandStore";

import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUpRes, ICreateUserReq>({
      query: (userData) => ({
        url: API_ROUTES.AUTH.SIGN_UP,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const setLoading = useAppStore.getState().setLoading;

        setLoading(true);
        try {
          const { data } = await queryFulfilled;
          const { user, tokens } = data;
          const { accessToken, refreshToken } = tokens;

          useAppStore.getState().setTokens(accessToken, refreshToken);
          useAppStore.getState().setUserId(user.id);

          showToast("Реєстрація успішна!", "success");
        } catch (error: any) {
          showToast(error?.message || "Сталася помилка", "error");
        } finally {
          setLoading(false);
        }
      },
    }),
    // validateToken: builder.query<IValidateTokenRes, void>({
    //   query: () => ({
    //     url: API_ROUTES.AUTH.VALIDATE_TOKEN,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useSignUpMutation,
  // useValidateTokenQuery
} = authAPI;
