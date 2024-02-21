import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import register from "../APICalls/register";

const CreateAccount = () => {
  let username = "";
  let password = "";
  let email = "";
  const navigate = useNavigate();
  const loginMessage = useUserStore((state) => state.loginMessage);

  const setUsername = (event) => {
    username = event.target.value;
  };

  const setPassword = (event) => {
    password = event.target.value;
  };

  const setEmail = (event) => {
    email = event.target.value;
  };

  const createAccount = async (username, password, email) => {
    const success = await register(username, password, email);
    if (success) navigate("/");
  };

  return (
    <div className="container">
      <h1>Meine Rezepte</h1>
      {loginMessage && <p>{loginMessage}</p>}
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
      <input
        type="email"
        placeholder="E-Mail Adresse"
        onChange={(event) => setEmail(event)}
      />
      <button onClick={() => createAccount(username, password, email)}>
        Account erstellen
      </button>
      <Link to="/login">
        <button className="reverse-colored-button" style={{ fontSize: "18px" }}>
          zurück zu Login
        </button>
      </Link>
    </div>
  );
};

export default CreateAccount;
