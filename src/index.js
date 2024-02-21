import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./components/ErrorPage";
import RecipesOfMonth from "./routes/RecipesOfMonth";
import Search from "./routes/Search";
import AddRecipe from "./routes/AddRecipe";
import ViewRecipe from "./routes/ViewRecipe";
import EditRecipe from "./routes/EditRecipe";
import DeleteRecipe from "./routes/DeleteRecipe";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
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
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/add",
        element: <AddRecipe />,
      },
      {
        path: "/recipes/:recipeName",
        element: <ViewRecipe />,
      },
      {
        path: "/recipes/:recipeName/edit",
        element: <EditRecipe />,
      },
      {
        path: "/recipes/:recipeName/delete",
        element: <DeleteRecipe />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
    errorElement: <ErrorPage />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
