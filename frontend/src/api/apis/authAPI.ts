import { API_ROUTES } from "@api/apiRoutes";
import { ICreateUserReq, ISignUpRes } from "@api/types/auth.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { showToast } from "@shared/index";
import { useAppStore } from "@stores/zustandStore";

import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signUp: builder.mutation<
      ISignUpRes,
      { userData: ICreateUserReq; t: (key: string) => string }
    >({
      query: ({ userData }) => ({
        url: API_ROUTES.AUTH.SIGN_UP,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          deviceId: userData.deviceId,
        },
      }),
      async onQueryStarted({ t }, { queryFulfilled }) {
        const setLoading = useAppStore.getState().setLoading;

        setLoading(true);
        try {
          const { data } = await queryFulfilled;
          const { user, tokens } = data;
          const { accessToken, refreshToken } = tokens;

          useAppStore.getState().setTokens(accessToken, refreshToken);
          useAppStore.getState().setUserId(user.id);
        } catch (e: any) {
          showToast(t("user.tryAgain"), "error");
        } finally {
          setLoading(false);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.AUTH.LOGOUT,
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const setLoading = useAppStore.getState().setLoading;

        setLoading(true);
        try {
          await queryFulfilled;
          useAppStore.getState().clearAuth();
        } catch (e: any) {
          showToast(`Logout failed`, "error");
        } finally {
          setLoading(false);
        }
      },
    }),
    signIn: builder.mutation<
      ISignUpRes,
      {
        email: string;
        password: string;
        deviceId: string;
      }
    >({
      query: ({ email, password, deviceId }) => ({
        url: API_ROUTES.AUTH.SIGN_IN,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email, password, deviceId },
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
        } catch (e: any) {
          showToast(e.error.data.messages, "error");
        } finally {
          setLoading(false);
        }
      },
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (email) => ({
        url: API_ROUTES.AUTH.FORGOT_PASSWORD,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const setLoading = useAppStore.getState().setLoading;

        setLoading(true);
        try {
          await queryFulfilled;
        } catch (e: any) {
        } finally {
          setLoading(false);
        }
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogoutMutation,
  useSignInMutation,
  useForgotPasswordMutation,
} = authAPI;
