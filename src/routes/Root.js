import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';
import Navbar from "../components/Navbar";

const Root = () => {
  const { loadRecipes } = useRecipeStore();

  // The recipes are loaded when the app is startet.
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
