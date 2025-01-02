import { URLS } from "@constants/url";

export const API_ROUTES = {
  AUTH: {
    SIGN_UP: `${URLS.AUTH}/sign-up`,
    SIGN_IN: `${URLS.AUTH}/sign-in`,
    LOGOUT: `${URLS.AUTH}/logout`,
    REFRESH: `${URLS.AUTH}/refresh`,
    // VALIDATE_TOKEN: "auth/validate-token",
    FORGOT_PASSWORD: `${URLS.AUTH}/forgot-password`,
  },
  USER: {
    GET_USER_BY_ID: (id: string) => `${URLS.USER}/${id}`,
    UPDATE: (id: string) => `${URLS.USER}/${id}`,
  },
  FILE: {
    UPLOAD: `${URLS.s3}/upload-file`,
    DELETE: `${URLS.s3}/delete-file`,
  },
  DISH: {
    GET_ALL_BY_CATEGORY: (categoryId: string) =>
      `dishes/category/${categoryId}`,
    GET_BY_ID: (dishId: string) => `dishes/${dishId}`,
    CREATE: "dishes",
    UPDATE: (dishId: string) => `dishes/${dishId}`,
    DELETE: (dishId: string) => `dishes/${dishId}`,
  },
};
