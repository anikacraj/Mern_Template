import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, role, allowedRoles, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/register" />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect if the user role isn't allowed to access this route
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
