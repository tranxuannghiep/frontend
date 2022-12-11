import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "redux/reducer";

export interface ProtectedRouteProps {
    children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.authReducer)
    if (Boolean(user.idUser)) return children;
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
}
