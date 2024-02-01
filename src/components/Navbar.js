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
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "not-active")}
            onClick={() => useRecipeStore.setState({ message: "" })}
          >
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "active" : "not-active")}
            onClick={() => useRecipeStore.setState({ message: "" })}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? "active" : "not-active")}
            onClick={() => useRecipeStore.setState({ message: "" })}
          >
            <FontAwesomeIcon icon={faPlus} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
