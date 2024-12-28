import { Dashboard } from "@components/index";
import { DishesPage, DishPage, HomePage, SignIn, SignUp } from "@pages/index";
import ProtectedRoute from "@routing/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

import { AppRoutes } from "./appRoutes";

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <HomePage />,
  },
  {
    path: AppRoutes.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: AppRoutes.SIGN_UP,
    element: <SignUp />,
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
    element: <HomePage />,
  },
]);
