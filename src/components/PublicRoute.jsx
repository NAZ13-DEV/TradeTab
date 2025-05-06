/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const hasSession = !!localStorage.getItem("uId");
  return hasSession ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
