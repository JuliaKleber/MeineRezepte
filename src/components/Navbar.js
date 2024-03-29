import React from "react";
import useRecipeStore from "../stores/recipeStore";
import useUserStore from "../stores/userStore";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faPlus,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const resetMessage = useRecipeStore((state) => state.resetMessage);
  const resetRecipes = useRecipeStore((state) => state.resetRecipes);
  const setLastLocation = useRecipeStore((state) => state.setLastLocation);
  const resetUser = useUserStore((state) => state.resetUser);

  const updateRecipeStore = (location) => {
    resetMessage();
    setLastLocation(location);
  };

  const logout = () => {
    resetRecipes();
    resetUser();
  };

  return (
    <nav className="navbar">
      <FontAwesomeIcon icon={faArrowRightFromBracket} className='hidden' />

      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "not-active")}
            onClick={() => updateRecipeStore("/")}
          >
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "active" : "not-active")}
            onClick={() => updateRecipeStore("/search")}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? "active" : "not-active")}
            onClick={() => resetMessage()}
          >
            <FontAwesomeIcon icon={faPlus} />
          </NavLink>
        </li>
      </ul>

      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "active" : "not-active")}
        onClick={() => logout()}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
