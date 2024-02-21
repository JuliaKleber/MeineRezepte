import React from 'react';
import { Link } from 'react-router-dom';
import createUser from '../APICalls/createUser';

const CreateAccount = () => {
  let username = "";
  let password = "";
  let email = "";

  const setUsername = (event) => {
    username = event.target.value;
  };

  const setPassword = (event) => {
    password = event.target.value;
  };

  const setEmail = (event) => {
    email = event.target.value;
  };

  const createAccount = (username, password, email) => {
    createUser(username, password, email);
  };

  return (
    <div className="container">
      <h1 className="verticalSpace">Meine Rezepte</h1>
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
      <Link to="/createAccount">
        <button onClick={() => createAccount(username, password, email)}>
          Account erstellen
        </button>
      </Link>
      <Link to="/login">
        <button className='reverse-colored-button' style={{fontSize: '18px'}}>
          zurück zu Login
        </button>
      </Link>
    </div>
  );
};

export default CreateAccount;
