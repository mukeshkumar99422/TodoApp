import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("todoUserData"));

  if (!user || !user.token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Logged in → show the page
};

export default ProtectedRoute;
