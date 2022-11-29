import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AUTH, ROLE } from "utils/constants";

export interface SellerRouteProps {
  children: ReactElement;
}

export default function SellerRoute({ children }: SellerRouteProps) {
  const role = localStorage.getItem(ROLE)
  const auth = localStorage.getItem(AUTH)
  if ((role === "admin" || role === "seller") && Boolean(auth)) return children;
  else if (Boolean(auth)) {
    return null;
  }
  return <Navigate to={ROUTES.login} />;
}
