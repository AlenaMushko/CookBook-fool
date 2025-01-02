import { API_ROUTES } from "@api/apiRoutes";
import { baseQueryWithReauth } from "@apis/baseQueryWithReauth";
import { IUpdateUserReq, IUser } from "@apiTypes/user.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { showToast } from "@shared/Toast";
import { useAppStore } from "@stores/zustandStore";

export const UserAPI = createApi({
  reducerPath: "UserAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["list", "item"],
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, { userId: string }>({
      query: ({ userId }) => ({
        url: API_ROUTES.USER.GET_USER_BY_ID(userId),
        method: "GET",
      }),
      providesTags: (result, error, { userId }) => [
        { type: "item", id: userId },
      ],
    }),
    updateUser: builder.mutation<
      IUser,
      { userId: string; userData: IUpdateUserReq; t: (key: string) => string }
    >({
      query: ({ userId, userData }) => ({
        url: API_ROUTES.USER.UPDATE(userId),
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "item", id: userId },
      ],
      async onQueryStarted({ t }, { queryFulfilled }) {
        const setLoading = useAppStore.getState().setLoading;

        setLoading(true);
        try {
          await queryFulfilled;
          showToast(t("user.profileUpdated"), "success");
        } catch (e: any) {
          showToast(t("user.tryAgain"), "error");
        } finally {
          setLoading(false);
        }
      },
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = UserAPI;
