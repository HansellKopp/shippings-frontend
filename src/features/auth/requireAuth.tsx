
import { useAuth } from "hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

type Props = {
    allowedRoles: string[]
}
export const RequireAuth = ({allowedRoles}: Props ) => {
    const { roles } = useAuth()
    const location = useLocation();

    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content;
}