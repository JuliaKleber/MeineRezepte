import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { register } from "../APICalls/usersAPICalls";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const registerMessage = useUserStore((state) => state.registerMessage);
  const resetUser = useUserStore((state) => state.resetUser);

  const createAccount = async (username, password, email) => {
    if (!username || !password || !email) {
      useUserStore.setState({
        registerMessage: "Bitte fülle alle Felder aus!",
      });
      return;
    }
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      createAccount(username, password, email);
    }
  };

  return (
    <div className="container register">
      <h1>Meine Rezepte</h1>
      {registerMessage && <p className="warning">{registerMessage}</p>}
      <input
        type="text"
        placeholder="Nutzername"
        onChange={(event) => setUsername(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        placeholder="Passwort"
        onChange={(event) => setPassword(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="email"
        placeholder="E-Mail Adresse"
        onChange={(event) => setEmail(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="create-button"
        onClick={() => createAccount(username, password, email)}
      >
        Account erstellen
      </button>
      <Link to="/login">
        <button
          className="back-button"
          style={{ fontSize: "18px" }}
          onClick={resetUser}
        >
          zurück zu Login
        </button>
      </Link>
    </div>
  );
};

export default CreateAccount;
