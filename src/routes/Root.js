import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import getRecipes from "../APICalls/getRecipes";

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // The recipes are loaded when the app is startet.
  useEffect(() => {
    if (isLoggedIn) getRecipes();
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Login />
  );
};

export default Root;
