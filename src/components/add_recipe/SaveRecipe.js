import React from "react";

function SaveRecipe(props) {
  const serverUrl = "http://localhost:3001";
  const recipe = {
    recipeName: props.recipeName,
    amounts: props.amounts,
    ingredients: props.ingredients,
    description: props.description,
    keywords: props.keywords,
  };

  // Speichert das Rezept ab
  function saveRecipe() {
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
        console.log("Antwort vom Server:", message);
        props.onChangeStep("recipeAdded");
      })
      .catch((error) => {
        // Fehlerbehandlung
        console.error("Fehler beim Senden der Daten:", error);
        props.onChangeStep("recipeNotAdded");
      });
  }

  return <button onClick={saveRecipe}>fertig</button>;
}

export default SaveRecipe;
