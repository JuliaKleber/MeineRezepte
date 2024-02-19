import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import getRecipes from "../APICalls/getRecipes";

const Root = () => {
  // The recipes are loaded when the app is startet.
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
