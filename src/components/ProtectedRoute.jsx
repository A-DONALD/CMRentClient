import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ roles, Component }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userRoles = user?.roles || {};

    const hasRequiredRole = roles.some(role => userRoles.includes(role));
    if (!hasRequiredRole) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Component />;
};

export default ProtectedRoute;