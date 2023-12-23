import React from 'react';

const DeleteRecipe = ({ recipes, setRecipes, recipe, onReturn }) => {
  const serverUrl = 'http://localhost:3001';

  // The recipe is removed from the json file
  const handleRecipeDeletion = () => {
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.indexOf(recipe);
    updatedRecipes.splice(index, 1);
    fetch(`${serverUrl}/updateRecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipes),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log('Antwort vom Server:', message);
        setRecipes(updatedRecipes);
        onReturn(true, 'Das Rezept wurde aus der Datenbank entfernt');
      })
      .catch((error) => {
        // Fehlerbehandlung
        console.error('Fehler beim Senden der Daten:', error);
        onReturn(false, 'Das Rezept konnte nicht gelöscht werden.');
      });
  };

  return (
    <div className='container'>
      <span className='align-center black'>
        Möchtest du das Rezept wirklich unwiderbringlich löschen?
      </span>
      <span>
        <button className='y-n' onClick={handleRecipeDeletion}>
          ja
        </button>
        <button className='y-n' onClick={() => onReturn(false)}>
          nein
        </button>
      </span>
    </div>
  );
}

export default DeleteRecipe;
