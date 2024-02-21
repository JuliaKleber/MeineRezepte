import React, { useEffect } from "react";
import useRecipeStore from "../stores/recipeStore";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import getRecipes from "../APICalls/getRecipes";

const Root = () => {
  const isLoggedIn = useRecipeStore((state) => state.isLoggedIn);
  
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
