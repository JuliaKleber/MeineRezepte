import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import Navbar from "../components/Navbar";

const Root = () => {
  const { loadRecipes } = useRecipeStore();

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
