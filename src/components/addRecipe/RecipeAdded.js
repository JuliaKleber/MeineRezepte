import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeAdded = ({ onChangeStep, setRecipe }) => {
  const navigate = useNavigate()

  const enterNewRecipe = () => {
    setRecipe({
      recipeName: '',
      amounts: [],
      ingredients: [],
      description: '',
      keywords: [],
    });
    onChangeStep('addIngredientsStep');
  }

  return (
    <div className='container'>
      <p className='align-center'>
        Das Rezept wurde der Datenbank hinzugefügt.
      </p>
      <button onClick={() => enterNewRecipe()}>weiteres Rezept hinzufügen</button>
      <button onClick={() => navigate('/')}>zum Startmenü</button>
    </div>
  );
}

export default RecipeAdded;
