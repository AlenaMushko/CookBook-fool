import { API_ROUTES } from "@api/apiRoutes";
import { baseQueryWithReauth } from "@apis/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import { showToast } from "@shared/Toast";
import { useAppStore } from "@stores/zustandStore";

export const FileAPI = createApi({
  reducerPath: "FileAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      { key: string },
      { formData: FormData; t: (key: string) => string }
    >({
      query: ({ formData }) => ({
        url: API_ROUTES.FILE.UPLOAD,
        method: "POST",
        body: formData,
        ContentType: "multipart/form-data",
      }),
      async onQueryStarted({ t }, { queryFulfilled }) {
        const setLoading = useAppStore.getState().setLoading;

        setLoading(true);
        try {
          await queryFulfilled;
          showToast(t("file.uploadSuccess"), "success");
        } catch (e: any) {
          if (e.error?.data?.statusCode !== 500) {
            showToast(t("file.uploadFail"), "error");
          } else {
            showToast(
              e.error?.data ??
                e.error?.data?.messages[0] ??
                t("file.uploadFail"),
              "error"
            );
          }
        } finally {
          setLoading(false);
        }
      },
    }),

    deleteFile: builder.mutation<
      void,
      { key: string; t: (key: string) => string }
    >({
      query: ({ key }) => ({
        url: API_ROUTES.FILE.DELETE,
        method: "POST",
        body: { key },
      }),
      async onQueryStarted({ t }, { queryFulfilled }) {
        const setLoading = useAppStore.getState().setLoading;

        setLoading(true);
        try {
          await queryFulfilled;
          showToast(t("file.removeSuccess"), "success");
        } catch (e: any) {
          if (e.error?.data?.statusCode !== 500) {
            showToast(t("file.removeFail"), "error");
          } else {
            showToast(
              e.error?.data ??
                e.error?.data?.messages[0] ??
                t("file.removeFail"),
              "error"
            );
          }
        } finally {
          setLoading(false);
        }
      },
    }),
  }),
});

export const { useUploadFileMutation, useDeleteFileMutation } = FileAPI;
