import { API_ROUTES } from "@api/apiRoutes";
import { SuccessRefreshTokenRes } from "@api/types";
import { CONFIG } from "@config/index";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { useAppStore } from "@stores/zustandStore";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: CONFIG.API_URL,
  prepareHeaders: async (headers) => {
    const { refreshToken } = useAppStore.getState();
    if (refreshToken) {
      headers.set("Authorization", `Bearer ${refreshToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  const { accessToken, refreshToken } = useAppStore.getState();

  if (accessToken) {
    const decoded = JSON.parse(atob(accessToken.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime && !refreshToken) {
      useAppStore.getState().clearAuth();
      return result;
    }

    if (
      result.error?.status === 401 ||
      (decoded.exp < currentTime && refreshToken)
    ) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const { refreshToken, userId, deviceId } = useAppStore.getState();

          if (refreshToken) {
            const dto = {
              userId,
              deviceId,
            };

            const refreshResult = await baseQuery(
              {
                url: API_ROUTES.AUTH.REFRESH,
                method: "POST",
                body: { dto },
              },
              api,
              extraOptions
            );

            if (refreshResult.data) {
              const { accessToken, refreshToken } = (
                refreshResult.data as SuccessRefreshTokenRes
              ).data;
              useAppStore.getState().setTokens(accessToken, refreshToken);

              result = await baseQuery(args, api, extraOptions);
            } else {
              useAppStore.getState().clearAuth();
            }
          } else {
            useAppStore.getState().clearAuth();
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};
