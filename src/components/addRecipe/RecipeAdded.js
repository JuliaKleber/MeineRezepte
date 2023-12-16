import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeAdded = () => {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <p className='align-center'>
        Das Rezept wurde der Datenbank hinzugefügt.
      </p>
      <button>weiteres Rezept hinzufügen</button>
      <button onClick={() => navigate('/')}>zum Startmenü</button>
    </div>
  );
}

export default RecipeAdded;
