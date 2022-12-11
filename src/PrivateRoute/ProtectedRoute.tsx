import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "redux/reducer";

export interface ProtectedRouteProps {
    children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useSelector((state: RootState) => state.authReducer)
    if (Boolean(user.idUser)) return children;
    return <Navigate to={ROUTES.login} />;
}
