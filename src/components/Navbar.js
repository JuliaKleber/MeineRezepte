import React from "react";
import useRecipeStore from "../stores/recipeStore";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const resetMessage = useRecipeStore((state) => state.resetMessage);
  const setLastLocation = useRecipeStore((state) => state.setLastLocation);

  const updateRecipeStore = (location) => {
    resetMessage();
    setLastLocation(location);
  };

  return (
    <nav className="navbar">
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
    </nav>
  );
};

export default Navbar;
