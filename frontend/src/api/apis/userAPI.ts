import { API_ROUTES } from "@api/apiRoutes";
import { baseQueryWithReauth } from "@apis/baseQueryWithReauth";
import { IUpdateUserReq, IUser } from "@apiTypes/user.types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const UserAPI = createApi({
  reducerPath: "UserAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, { userId: string }>({
      query: ({ userId }) => ({
        url: API_ROUTES.USER.GET_USER_BY_ID(userId),
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<
      IUser,
      { userId: string; userData: IUpdateUserReq; t: (key: string) => string }
    >({
      query: ({ userId, userData }) => ({
        url: API_ROUTES.USER.UPDATE(userId),
        method: "PUT",
        body: userData,
      }),
      async onQueryStarted({ t }) {
        console.log("onQueryStarted");
      },
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = UserAPI;
