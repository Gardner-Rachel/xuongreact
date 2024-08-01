import { type ReactElement } from "react";
import { Navigate } from "react-router";

interface Props {
    children: ReactElement;
    requiredRole: string;
}

const PrivateRoute: React.FC<Props> = ({ children, requiredRole  }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const isAuthenticated = !!user._id;
    const hasRequiredRole = user.role === requiredRole;
    
    return isAuthenticated && hasRequiredRole ? children : <Navigate to="/" />;
};

export default PrivateRoute;
