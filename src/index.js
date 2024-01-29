import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import Root from "./routes/Root";
import ErrorPage from "./components/ErrorPage";
import RecipesOfMonth, {
  loader as recipesOfMonthLoader,
} from "./routes/RecipesOfMonth";
import Search, { loader as searchLoader } from "./routes/Search";
import AddRecipe, { loader as addLoader } from "./routes/AddRecipe";
import ShowRecipe, { loader as showLoader } from "./routes/ShowRecipe";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <RecipesOfMonth />,
        loader: recipesOfMonthLoader,
      },
      {
        path: "/search",
        element: <Search />,
        loader: searchLoader,
      },
      {
        path: "/add",
        element: <AddRecipe />,
        loader: addLoader,
      },
      {
        path: "/recipes/:recipeName",
        element: <ShowRecipe />,
        loader: ({ params }) => showLoader(params.recipeName),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
