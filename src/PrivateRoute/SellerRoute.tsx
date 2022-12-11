import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "redux/reducer";

export interface SellerRouteProps {
  children: ReactElement;
}

export default function SellerRoute({ children }: SellerRouteProps) {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.authReducer)
  if ((user.role === "admin" || user.role === "seller") && Boolean(user.idUser)) return children;
  else if (Boolean(user.idUser)) {
    return null;
  }
  return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
}
