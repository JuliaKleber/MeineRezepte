import React from "react";

const Login = () => {
  return (
    <div className='container'>
      <h1 className='verticalSpace'>Meine Rezepte</h1>
      <input type='text' placeholder='Benutzername' />
      <input type='password' placeholder='Passwort' />
      <button>Login</button>
      <p className='note'>If you want to see a recipe book already filled with some recipes, use 'mock' as user name and password.</p>
    </div>
  );
};

export default Login;
