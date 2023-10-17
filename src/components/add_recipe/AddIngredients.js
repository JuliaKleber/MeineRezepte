import React, { useState } from "react";
import IngredientGroup from "./IngredientGroup";

function AddIngredients({ onChangeStep, onSaveIngredients, onSaveKeywords }) {
  const [chosenIngredients, setChosenIngredients] = useState([]);
  const [keywords, setKeywords] = useState([]);

  // Zutat wird der Liste der Zutaten hinzugefügt.
  // Die Zutat wird ebenso zu der Liste der Schlagwörter hinzugefügt,
  // damit das Rezept aufgrund der Zutaten gefunden werden kann
  const addIngredient = (ingredient) => {
    setChosenIngredients([...chosenIngredients, ingredient]);
    setKeywords([...keywords, ingredient]);
  };

  // Zutat wird aus der Liste der Zutaten entfernt
  const removeIngredient = (ingredient) => {
    let newChosenIngredients = [...chosenIngredients];
    let index = newChosenIngredients.indexOf(ingredient);
    newChosenIngredients.splice(index, 1);
    setChosenIngredients(newChosenIngredients);
    let newKeywords = [...keywords];
    index = newKeywords.indexOf(ingredient);
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  return (
    <div className="container">
      <div>
        <IngredientGroup
          ingredientsCategory="Basis"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Brot",
            "Kartoffeln",
            "Süßkartoffeln",
            "Fusilli",
            "Lasagneplatten",
            "Spaghetti",
            "Nudeln",
            "Reis",
            "Dinkelreis",
            "Risottoreis",
          ]}
        />
        <IngredientGroup
          ingredientsCategory="Öl"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={["Kokosöl", "Olivenöl", "Rapsöl"]}
        />
        <IngredientGroup
          ingredientsCategory="Gemüse"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Zwiebeln",
            "Knoblauchzehen",
            "Aubergine",
            "bunte Bete",
            "Fenchel",
            "Frühlingszwiebeln",
            "getrocknete Tomaten",
            "Gurke",
            "Lauch",
            "Mangold",
            "Möhren",
            "Paprika",
            "Rahmspinat",
            "rote Bete",
            "Spargel",
            "Spinat",
            "Süßkartoffeln",
            "Tomaten",
            "Zucchini",
          ]}
        />
        <IngredientGroup
          ingredientsCategory="Kohl"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Blumenkohl",
            "Brokkoli",
            "Grünkohl",
            "Kohlrabi",
            "Pak Choi",
            "Rosenkohl",
            "Rotkohl",
            "Schwarzkohl",
            "Spitzkohl",
            "Weißkohl",
            "Wirsing",
          ]}
        />
        <IngredientGroup
          ingredientsCategory="Gewürze und Kräuter"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Basilikum",
            "Chilischoten",
            "Ingwer",
            "Kräuter der Provence",
            "Muskat",
            "Petersilie",
            "Rosmarin",
            "rote Currypaste",
            "Safran",
            "Salz",
            "Schnittlauch",
            "schwarzer Pfeffer",
          ]}
        />
        <IngredientGroup
          ingredientsCategory="Hülsenfrüchte"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Erbsen",
            "Kichererbsen",
            "Kidneybohnen",
            "Linsen",
            "schwarze Bohnen",
          ]}
        />
        <IngredientGroup
          ingredientsCategory="Käse"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Blauschimmelkäse",
            "Emmentaler",
            "Feta",
            "Gouda",
            "Hüttenkäse",
            "Mozarella",
            "Parmesan",
            "Pecorino",
          ]}
        />{" "}
        <IngredientGroup
          ingredientsCategory="Nüsse und Samen"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Cashews",
            "Erdnüsse",
            "Pinienkerne",
            "Pistazien",
            "Sesam",
            "Sonnenblumenkerne",
          ]}
        />
        <IngredientGroup
          ingredientsCategory="Obst"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Äpfel",
            "Avocados",
            "Bananen",
            "Datteln",
            "Nektarinen",
            "Rosinen",
          ]}
        />
        <IngredientGroup
          ingredientsCategory="Sonstiges"
          onIngredientSelected={addIngredient}
          onIngredientDeselected={removeIngredient}
          choiceOfIngredients={[
            "Avocado",
            "Champignons",
            "Oliven",
            "Quark",
            "Rotwein",
            "Tacco Chips",
            "Tofu",
            "Tunfisch",
            "Weißwein",
          ]}
        />
      </div>
      <span>
        <button onClick={() => onChangeStep("none")}>zurück</button>
        <button
          onClick={() => {
            onChangeStep("amounts");
            onSaveIngredients(chosenIngredients);
            onSaveKeywords(keywords);
          }}
        >
          weiter
        </button>
      </span>
    </div>
  );
}

export default AddIngredients;
