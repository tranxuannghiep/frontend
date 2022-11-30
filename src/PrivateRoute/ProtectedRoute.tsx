import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AUTH } from "utils/constants";

export interface ProtectedRouteProps {
    children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const auth = localStorage.getItem(AUTH)
    if (Boolean(auth)) return children;
    return <Navigate to={ROUTES.login} />;
}
