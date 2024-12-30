import { baseQueryWithReauth } from "@apis/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";

export const UserAPI = createApi({
  reducerPath: "UserAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
