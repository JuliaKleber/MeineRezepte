import React from './RecipeAdded';

const RecipeNotAdded = ({ onChangeStep }) => {
  const goToStartMenu = () => {
    onChangeStep('homeStep');
  };

  return (
    <div className='container'>
      <p>Das Rezept konnte nicht gespeichert werden.</p>
      <button onClick={goToStartMenu}>zum Startmenü</button>
    </div>
  );
}

export default RecipeNotAdded;
