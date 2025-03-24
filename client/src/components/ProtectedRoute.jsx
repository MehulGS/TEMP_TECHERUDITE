import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to={allowedRoles.includes("admin") ? "/admin-login" : "/customer-login"} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === "admin" ? "/admin-dashboard" : "/customer-dashboard"} replace />;
  }

  return element; 
};

export default ProtectedRoute;