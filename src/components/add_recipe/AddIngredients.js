import React from "react";
import IngredientGroup from "./IngredientGroup";

function AddIngredients({ recipe, setRecipe }) {
  // Zutat wird der Liste der Zutaten hinzugefügt.
  // Die Zutat wird ebenso zu der Liste der Schlagwörter hinzugefügt,
  // damit das Rezept aufgrund der Zutaten gefunden werden kann
  const addIngredient = (ingredient) => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ingredient],
      keywords: [...recipe.keywords, ingredient],
    });
  };

  // Zutat wird aus der Liste der Zutaten und Keywords entfernt
  const removeIngredient = (ingredient) => {
    const newIngredients = [...recipe.ingredients];
    let index = recipe.ingredients.indexOf(ingredient);
    newIngredients.splice(index, 1);
    const newKeywords = [...recipe.keywords];
    index = recipe.keywords.indexOf(ingredient);
    newKeywords.splice(index, 1);
    setRecipe({
      ...recipe,
      ingredients: newIngredients,
      keywords: newKeywords,
    });
  };

  return (
    <div className="container">
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
  );
}

export default AddIngredients;
