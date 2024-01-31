import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';
import Navbar from "../components/Navbar";
import { getRecipes } from '../AJAX/apiCalls';

const Root = () => {

  // The recipes are loaded when the app is startet.
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getRecipes();
        useRecipeStore.setState({ recipes: recipes });
      } catch (error) {
        console.error('Fehler beim Laden der Rezepte', error);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
