import React from "react";
import useRecipeStore from "../stores/recipeStore";
import login from "../APICalls/login";

const Login = () => {
  let username = '';
  let password = '';
  const loginMessage = useRecipeStore((state) => state.loginMessage);

  const setUsername = (event) => {
    username = event.target.value;
  };

  const setPassword = (event) => {
    password = event.target.value;
  };

  const evaluateCredentials = (username, password) => {
    login(username, password);
  };

  return (
    <div className='container'>
      <h1 className='verticalSpace'>Meine Rezepte</h1>
      <input type='text' placeholder='Benutzername' onChange={(event) => setUsername(event)} />
      <input type='password' placeholder='Passwort' onChange={(event) => setPassword(event)} />
      {loginMessage && <p>{loginMessage}</p>}
      <button onClick={() => evaluateCredentials(username, password)}>Login</button>
      <p className='note'>If you want to see a recipe book already filled with some recipes, use 'mock' as user name and password.</p>
    </div>
  );
};

export default Login;
