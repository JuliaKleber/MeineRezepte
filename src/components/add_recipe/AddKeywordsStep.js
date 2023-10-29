import React from "react";
import KeywordCategories from "./KeywordCategories";

function AddKeywordsStep({ recipe, setRecipe }) {
  return (
    <>
      <KeywordCategories
        keywordCategory="Ernährungsform"
        listOfKeywords={["vegan", "vegetarisch"]}
        recipe={recipe}
        setRecipe={setRecipe}
      />
      <KeywordCategories
        keywordCategory="Zeitbedarf"
        listOfKeywords={["schnell", "mittel", "aufwändig"]}
        recipe={recipe}
        setRecipe={setRecipe}
      />
      <KeywordCategories
        keywordCategory="Jahreszeit"
        listOfKeywords={["Frühling", "Sommer", "Herbst", "Winter"]}
        recipe={recipe}
        setRecipe={setRecipe}
      />
      <KeywordCategories
        keywordCategory="Saison der Hauptzutaten"
        listOfKeywords={[
          "Januar",
          "Februar",
          "März",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
        ]}
        recipe={recipe}
        setRecipe={setRecipe}
      />
      <KeywordCategories
        keywordCategory="Stil"
        listOfKeywords={[
          "asiatisch",
          "deutsch",
          "italienisch",
          "TexMex",
          "Sonstiges",
        ]}
        recipe={recipe}
        setRecipe={setRecipe}
      />
      <KeywordCategories
        keywordCategory="Kategorie"
        listOfKeywords={["Curry", "Lasagne", "Nudeln", "Sonstiges"]}
        recipe={recipe}
        setRecipe={setRecipe}
      />
    </>
  );
}

export default AddKeywordsStep;
