import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "redux/reducer";

export interface PrivateRouteProps {
  children: ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.authReducer)
  if (user.role === "admin" && Boolean(user.idUser)) return children;
  else if (Boolean(user.idUser)) {
    return null;
  }
  return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
}
