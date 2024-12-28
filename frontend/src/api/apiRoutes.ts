import { CONFIG } from "../config";

export const API_URL = CONFIG.API_URL;

export const API_ROUTES = {
  AUTH: {
    SIGN_IN: "auth/sign-in",
    SIGN_UP: "auth/sign-up",
    REFRESH: "auth/refresh",
    VALIDATE_TOKEN: "auth/validate-token",
    FORGET_PASSWORD: "auth/forget-password",
  },
  USER: {
    GET_USER: "users/currentUser",
    UPDATE: (id: string) => `users/${id}`,
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
