import React, { useEffect } from "react";
import useRecipeStore from "../stores/recipeStore";
import useUserStore from "../stores/userStore";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getRecipes } from "../APICalls/recipesAPICalls";
import { addMockUser } from "../users/addMockUser";

const Root = () => {
  const navigate = useNavigate();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const userId = useUserStore((state) => state.currentUserId);

  // The recipes are loaded when the app is startet.
  useEffect(() => {
    if (isLoggedIn) {
      getRecipes(userId);
    } else {
      setRecipes([]);
      addMockUser();
      navigate("/login");
    }
  }, [isLoggedIn, navigate, setRecipes, userId]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
};

export default Root;
