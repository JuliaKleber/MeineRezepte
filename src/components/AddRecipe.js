import React, { useState, useCallback } from "react";
import IngredientGroup from "./IngredientGroup";

function AddRecipe(props) {
  const [currentStep, setCurrentStep] = useState("ingredients");
  const [allIngredientsChosen, setAllIngredientsChosen] = useState(false);
  const [allAmountsChosen, setAllAmountsChosen] = useState(false);
  const [allTagsChosen, setAllTagsChosen] = useState(false);
  const [chosenIngredients, setChosenIngredients] = useState([]);

  function logIngredients() {
    setAllIngredientsChosen(true);
    setCurrentStep("amounts");
    console.log(allIngredientsChosen);
  }

  const saveIngredientsBase = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsLegumes = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsOil = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsVegetables = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsCabbage = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsSpices = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsNuts = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsCheese = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsFruits = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  const saveIngredientsOther = useCallback((ingredients) => {
    setChosenIngredients((prevChosenIngredients) =>
      prevChosenIngredients.concat(ingredients)
    );
  }, []);

  function logAmounts() {
    setAllAmountsChosen(true);
    setCurrentStep("tags");
  }

  function logTags() {
    setAllTagsChosen(true);
    setCurrentStep("none");
    props.onReturnHome(true);
  }

  return (
    <div>
      {currentStep === "ingredients" && (
        <div>
          <IngredientGroup
            ingredientsCategory="Basis"
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsBase}
            ingredients={[
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
            ingredientsCategory="Hülsenfrüchte"
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsLegumes}
            ingredients={[
              "Erbsen",
              "Kichererbsen",
              "Kidneybohnen",
              "Linsen",
              "schwarze Bohnen",
            ]}
          />
          <IngredientGroup
            ingredientsCategory="Öl"
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsOil}
            ingredients={["Kokosöl", "Olivenöl", "Rapsöl"]}
          />
          <IngredientGroup
            ingredientsCategory="Gemüse"
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsVegetables}
            ingredients={[
              "Zwiebeln",
              "Knoblauch",
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
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsCabbage}
            ingredients={[
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
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsSpices}
            ingredients={[
              "Basilikum",
              "Chilischoten",
              "Ingwer",
              "Kräuter der Provence",
              "Muskat",
              "Petersilie",
              "rote Currypaste",
              "Safran",
              "Salz",
              "Schnittlauch",
              "schwarzer Pfeffer",
            ]}
          />
          <IngredientGroup
            ingredientsCategory="Nüsse und Samen"
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsNuts}
            ingredients={[
              "Cashews",
              "Erdnüsse",
              "Pinienkerne",
              "Pistazien",
              "Sesam",
              "Sonnenblumenkerne",
            ]}
          />
          <IngredientGroup
            ingredientsCategory="Käse"
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsCheese}
            ingredients={[
              "Blauschimmelkäse",
              "Emmentaler",
              "Feta",
              "Gouda",
              "Hüttenkäse",
              "Mozarella",
              "Parmesan",
              "Pecorino",
            ]}
          />
          <IngredientGroup
            ingredientsCategory="Obst"
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsFruits}
            ingredients={[
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
            allIngredientsChosen={allIngredientsChosen}
            onIngredientsChosen={saveIngredientsOther}
            ingredients={[
              "Champignons",
              "Oliven",
              "Rotwein",
              "Tacco Chips",
              "Tofu",
              "Tunfisch",
              "Weißwein",
            ]}
          />
          <br />
          <br />
          <input type="button" value="fertig" onClick={logIngredients} />
        </div>
      )}
      {currentStep === "amounts" && (
        <div>
          <p>
            Hier müssen noch die Mengen rein
            <br />
            {console.log(
              "chosenIngredients in isShownAmounts:" + chosenIngredients
            )}
            {chosenIngredients}
          </p>
          <input type="button" value="fertig" onClick={logAmounts} />
        </div>
      )}
      {currentStep === "tags" && (
        <div>
          <p>Hier müssen noch die Tags rein.</p>
          <input type="button" value="fertig" onClick={logTags} />
        </div>
      )}
    </div>
  );
}

export default AddRecipe;
