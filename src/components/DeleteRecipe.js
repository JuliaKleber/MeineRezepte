import React from 'react';

const DeleteRecipe = ({ recipes, setRecipes, recipe, onReturn }) => {
  const serverUrl = 'http://localhost:3001';

  // Das Rezept wird gelöscht.
  const handleRecipeDeletion = () => {
    // Das Rezept wird aus dem Array updatedRecipes entfernt
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.indexOf(recipe);
    updatedRecipes.splice(index, 1);
    // Es wird die Funktion fetch() verwendet,
    // um Daten an einen Server zu senden.
    // serverUrl ist die Adresse des Servers,
    // an den die Daten gesendet werden sollen.
    fetch(`${serverUrl}/updateRecipe`, {
      // Es wird die HTTP-Methode POST verwendet,
      // um Daten an den Server zu senden.
      method: 'POST',
      // Es wird angegeben, dass die Daten
      // im JSON-Format gesendet werden.
      headers: {
        'Content-Type': 'application/json',
      },
      // Es wird das Rezept-Objekt in JSON-Format
      // umgewandelt und als Datenkörper gesendet.
      body: JSON.stringify(updatedRecipes),
    })
      .then((response) => response.text())
      .then((message) => {
        // Es wird die Nachricht aus der
        // Server-Antwort in der Konsole ausgegeben.
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
