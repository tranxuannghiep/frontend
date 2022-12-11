import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "redux/reducer";

export interface SellerRouteProps {
  children: ReactElement;
}

export default function SellerRoute({ children }: SellerRouteProps) {
  const { user } = useSelector((state: RootState) => state.authReducer)
  if ((user.role === "admin" || user.role === "seller") && Boolean(user.idUser)) return children;
  else if (Boolean(user.idUser)) {
    return null;
  }
  return <Navigate to={ROUTES.login} />;
}
