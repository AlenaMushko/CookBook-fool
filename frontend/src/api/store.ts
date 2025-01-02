import { FileAPI } from "@apis/fileAPI";
import { authAPI } from "@apis/index";
import { UserAPI } from "@apis/userAPI";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [UserAPI.reducerPath]: UserAPI.reducer,
    [FileAPI.reducerPath]: FileAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(UserAPI.middleware)
      .concat(FileAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
