import { API_ROUTES } from "@api/apiRoutes";
import { DishCategoryList, IDishListRes } from "@api/types";
import { baseQueryWithReauth } from "@apis/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import { showToast } from "@shared/Toast";
import { useAppStore } from "@stores/zustandStore";

export const DishAPI = createApi({
  reducerPath: "DishAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["list", "item"],
  endpoints: (builder) => ({
    getDishCategories: builder.query<DishCategoryList, void>({
      query: () => ({
        url: API_ROUTES.DISH.GET_DISH_CATEGORIES,
        method: "GET",
      }),
      providesTags: ["list"],
    }),

    getAllDishes: builder.query<
      IDishListRes,
      { limit?: number; offset?: number; categoryId?: string; search?: string }
    >({
      query: ({ limit = 10, offset = 0, categoryId, search }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", String(limit));
        if (offset) params.append("offset", String(offset));
        if (categoryId) params.append("categoryId", categoryId);
        if (search) params.append("search", search);

        return {
          url: `${API_ROUTES.DISH.GET_ALL}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["list"],
    }),
  }),
});

export const { useGetDishCategoriesQuery, useGetAllDishesQuery } = DishAPI;
