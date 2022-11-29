import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AUTH, ROLE } from "utils/constants";

export interface PrivateRouteProps {
  children: ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const role = localStorage.getItem(ROLE)
  const auth = localStorage.getItem(AUTH)
  if (role === "admin" && Boolean(auth)) return children;
  else if (Boolean(auth)) {
    return null;
  }
  return <Navigate to={ROUTES.login} />;
}
