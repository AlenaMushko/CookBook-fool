import { AppRoutes } from "@routing/appRoutes";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = true;

  return isAuthenticated ? (
    children || <Outlet />
  ) : (
    <Navigate to={AppRoutes.SIGN_IN} />
  );
};

export default ProtectedRoute;
