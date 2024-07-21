import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "./hooks/UseAuth";

const RequireAuth = () => {
    const { auth } = UseAuth();
    const location = useLocation();

    const isAuthenticated = localStorage.getItem("auth");

    return (
        auth?.email || isAuthenticated ? <Outlet />
            : <Navigate to='/login'
                replace state={{ from: location }}
            />
    )
}

export default RequireAuth;