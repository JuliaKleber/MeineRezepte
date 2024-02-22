import React from "react";
import useUserStore from "../stores/userStore";
import { login } from "../APICalls/usersAPICalls";
import { Link, useNavigate } from "react-router-dom";
import { loadHardCodedRecipes } from "../recipes/loadHardCodedRecipes";

const Login = () => {
  const navigate = useNavigate();
  let username = "";
  let password = "";
  const loginMessage = useUserStore((state) => state.loginMessage);
  const resetRegisterMessage = useUserStore((state) => state.resetRegisterMessage);

  const setUsername = (event) => {
    username = event.target.value;
  };

  const setPassword = (event) => {
    password = event.target.value;
  };

  const evaluateCredentials = async (username, password) => {
    const success = await login(username, password);
    if (success && (username === "mock" || username === "Julia")) {
      await loadHardCodedRecipes();
    }
    if (success) navigate("/");
  };

  return (
    <div className="container login">
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
        <button
          className="reverse-colored-button new-account-button"
          onClick={() => resetRegisterMessage("")}
        >
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
