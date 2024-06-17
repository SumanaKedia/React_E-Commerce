// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React from 'react';

const ProtectedRoute = ({ children }) => {
    const { authenticated } = useAuth();

    if (!authenticated) {
        // alert("Login to continue!")
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
