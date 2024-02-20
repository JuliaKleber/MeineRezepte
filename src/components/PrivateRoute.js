import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, element }) => {
  const isLoggedIn = true;
  return isLoggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
