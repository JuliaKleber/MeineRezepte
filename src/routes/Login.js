import React from "react";
import useRecipeStore from "../stores/recipeStore";
import login from "../APICalls/login";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  let username = "";
  let password = "";
  const loginMessage = useRecipeStore((state) => state.loginMessage);

  const setUsername = (event) => {
    username = event.target.value;
  };

  const setPassword = (event) => {
    password = event.target.value;
  };

  const evaluateCredentials = async (username, password) => {
    const success = await login(username, password);
    if (success) navigate("/");
  };

  return (
    <div className="container">
      <h1>Meine Rezepte</h1>
      <input
        type="text"
        placeholder="Benutzername"
        onChange={(event) => setUsername(event)}
      />
      <input
        type="password"
        placeholder="Passwort"
        onChange={(event) => setPassword(event)}
      />
      {loginMessage && <p>{loginMessage}</p>}
      <button onClick={() => evaluateCredentials(username, password)}>
        Login
      </button>
      <Link to="/register">
        <button className="reverse-colored-button" style={{ fontSize: "18px" }}>
          Account erstellen
        </button>
      </Link>
      <p className="note">
        Um ein Rezeptbuch anzusehen, das bereits mit einigen Beispielrezepten
        gefüllt ist, kann 'mock' als Benutzername und Passwort eingegeben
        werden.
      </p>
    </div>
  );
};

export default Login;
