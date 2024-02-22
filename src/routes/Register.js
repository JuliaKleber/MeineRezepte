import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { register } from "../APICalls/usersAPICalls";

const CreateAccount = () => {
  let username = "";
  let password = "";
  let email = "";
  const navigate = useNavigate();
  const registerMessagePartOne = useUserStore(
    (state) => state.registerMessagePartOne
  );
  const registerMessagePartTwo = useUserStore(
    (state) => state.registerMessagePartTwo
  );

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
    const data = await register(username, password, email);
    if (data) {
      useUserStore.setState({
        isLoggedIn: true,
        userId: data.userId,
        registerMessage: data.message,
      });
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h1>Meine Rezepte</h1>
      {registerMessagePartOne && <span>{registerMessagePartOne}</span>}
      {registerMessagePartTwo && (
        <span className="warning">{registerMessagePartTwo}</span>
      )}
      <input
        type="text"
        placeholder="Nutzername"
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
