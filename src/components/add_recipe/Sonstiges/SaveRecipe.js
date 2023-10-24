import React from "react";

function SaveRecipe( {recipe, onChangeStep} ) {
  const serverUrl = "http://localhost:3001";

  // Speichert das Rezept ab
  function handleSaveRecipe() {
    // Es wird die Funktion fetch() verwendet, um Daten an einen Server zu senden.
    // serverUrl ist die Adresse des Servers, an den die Daten gesendet werden sollen.
    // addData ist der Endpunkt, der auf dem Server genutzt wird.
    fetch(`${serverUrl}/addData`, {
      // Es wird die HTTP-Methode POST verwendet, um Daten an den Server zu senden.
      method: "POST",
      // Es wird angegeben, dass die Daten im JSON-Format gesendet werden.
      headers: {
        "Content-Type": "application/json",
      },
      // Es wird das Rezept-Objekt in JSON-Format umgewandelt und als Datenkörper gesendet.
      body: JSON.stringify(recipe),
    })
      // Promises
      .then((response) => response.text())
      .then((message) => {
        // Es wird die Nachricht aus der Server-Antwort in der Konsole ausgegeben.
        console.log(recipe.recipeName);
        console.log("Antwort vom Server:", message);
        onChangeStep("recipeAdded");
      })
      .catch((error) => {
        // Fehlerbehandlung
        console.error("Fehler beim Senden der Daten:", error);
        onChangeStep("recipeNotAdded");
      });
  }

  return <button onClick={handleSaveRecipe}>fertig</button>;
}

export default SaveRecipe;
