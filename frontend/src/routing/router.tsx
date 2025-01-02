import { Dashboard, MainLayout } from "@components/index";
import ForgotPasswordPage from "@pages/ForgotPasswordPage";
import {
  DishesPage,
  DishPage,
  HomePage,
  SignInPage,
  SignUpPage,
} from "@pages/index";
import ProtectedRoute from "@routing/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

import { AppRoutes } from "./appRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.HOME,
        element: <HomePage />,
      },
      {
        path: AppRoutes.SIGN_IN,
        element: <SignInPage />,
      },
      {
        path: AppRoutes.SIGN_UP,
        element: <SignUpPage />,
      },
      {
        path: AppRoutes.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: AppRoutes.DASHBOARD,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          { path: AppRoutes.DISHES_CATEGORY, element: <DishesPage /> },
          { path: AppRoutes.DISH, element: <DishPage /> },
        ],
      },
      {
        path: "*",
        element: <p>404</p>,
      },
    ],
  },
]);
