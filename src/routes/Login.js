import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import { login } from "../APICalls/usersAPICalls";
import { Link, useNavigate } from "react-router-dom";
import { loadHardCodedRecipes } from "../recipes/loadHardCodedRecipes";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginMessage = useUserStore((state) => state.loginMessage);
  const resetUser = useUserStore(
    (state) => state.resetUser
  );

  const evaluateCredentials = async (username, password) => {
    const success = await login(username, password);
    if (success && (username === "mock" || username === "Julia")) {
      await loadHardCodedRecipes();
    }
    if (success) navigate("/");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      evaluateCredentials(username, password);
    }
  };

  return (
    <div className="container login">
      <h1>Meine Rezepte</h1>
      {loginMessage && <p className="warning">{loginMessage}</p>}
      <input
        type="text"
        placeholder="Benutzername"
        onChange={(event) => setUsername(event.target.value)}
        onKeyDown={handleKeyPress}
      />
      <input
        type="password"
        placeholder="Passwort"
        onChange={(event) => setPassword(event.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="login-button"
        onClick={() => evaluateCredentials(username, password)}
      >
        Login
      </button>
      <p className="note">
        Um ein Rezeptbuch anzusehen, das bereits mit einigen Beispielrezepten
        gefüllt ist, kann 'mock' als Benutzername und Passwort eingegeben
        werden.
      </p>
      <Link to="/register">
        <button
          className="reverse-colored-button new-account-button"
          onClick={resetUser}
        >
          Account erstellen
        </button>
      </Link>
    </div>
  );
};

export default Login;
