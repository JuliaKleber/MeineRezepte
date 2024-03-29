import React from "react";
import IngredientGroup from "./IngredientGroup";

const AddIngredientsStep = ({ recipe, setRecipe }) => {
  return (
    <div className="container">
      <h3 className="primary-color bold">Zutaten</h3>
      <IngredientGroup
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Basis"
        choiceOfIngredients={[
          "Brot",
          "Kartoffeln",
          "Süßkartoffeln",
          "Bandnudeln",
          "Fusilli",
          "Lasagneplatten",
          "Spaghetti",
          "Nudeln",
          "Spätzle",
          "Dinkelreis",
          "Reis",
          "Risottoreis",
        ]}
      />
      <IngredientGroup
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Öl"
        choiceOfIngredients={["Kokosöl", "Olivenöl", "Rapsöl"]}
      />
      <IngredientGroup
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Gemüse"
        choiceOfIngredients={[
          "Zwiebeln",
          "Knoblauchzehen",
          "Aubergine",
          "bunte Bete",
          "Dosentomaten",
          "Fenchel",
          "frische Chilischoten",
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
          "Suppengrün",
          "Tomaten",
          "Zucchini",
        ]}
      />
      <IngredientGroup
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Kohl"
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
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Gewürze und Kräuter"
        choiceOfIngredients={[
          "Basilikum",
          "Chilischoten",
          "Ingwer",
          "Kräuter der Provence",
          "Kreuzkümmel",
          "Lorberrblätter",
          "Muskat",
          "Petersilie",
          "Rosmarin",
          "rote Currypaste",
          "Safran",
          "Salz",
          "Schnittlauch",
          "schwarzer Pfeffer",
          "Thymian",
        ]}
      />
      <IngredientGroup
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Hülsenfrüchte"
        choiceOfIngredients={[
          "Erbsen",
          "Kichererbsen",
          "Kidneybohnen",
          "Linsen",
          "schwarze Bohnen",
        ]}
      />
      <IngredientGroup
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Käse"
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
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Nüsse und Samen"
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
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Obst"
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
        recipe={recipe}
        setRecipe={setRecipe}
        ingredientsCategory="Sonstiges"
        choiceOfIngredients={[
          "Avocado",
          "Butter",
          "Champignons",
          "Hackfleisch",
          "Kokosmilch",
          "Mehl",
          "Milch",
          "Oliven",
          "Quark",
          "Rotwein",
          "Schmand",
          "Tacco Chips",
          "Tofu",
          "Tunfisch",
          "Weißwein",
        ]}
      />
    </div>
  );
};

export default AddIngredientsStep;
