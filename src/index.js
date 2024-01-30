import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./components/ErrorPage";
import RecipesOfMonth, { loader as monthLoader } from "./routes/RecipesOfMonth";
import Search, { loader as searchLoader } from "./routes/Search";
import AddRecipe, { loader as addLoader } from "./routes/AddRecipe";
import ViewRecipe, { loader as viewLoader } from "./routes/ViewRecipe";
import EditRecipe, { loader as editLoader } from "./routes/EditRecipe";
import DeleteRecipe, { loader as deleteLoader } from './routes/DeleteRecipe';
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <RecipesOfMonth />,
        loader: monthLoader,
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
        element: <ViewRecipe />,
        loader: ({ params }) => viewLoader(params.recipeName),
      },
      {
        path: "/recipes/:recipeName/edit",
        element: <EditRecipe />,
        loader: ({ params }) => editLoader(params.recipeName),
      },
      {
        path: "/recipes/:recipeName/delete",
        element: <DeleteRecipe />,
        loader: ({ params }) => deleteLoader(params.recipeName),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
