import React from "react";
import CategoryKeywords from "./CategoryKeywords";

const AddKeywordsStep = ({ recipe, setRecipe }) => {
  return (
    <div className="container add-keywords-step">
      <div className="width">
        <CategoryKeywords
          keywordCategory="Ernährungsform"
          listOfKeywords={["vegan", "vegetarisch"]}
          recipe={recipe}
          setRecipe={setRecipe}
        />
        <CategoryKeywords
          keywordCategory="Zeitbedarf"
          listOfKeywords={["schnell", "mittel", "aufwändig"]}
          recipe={recipe}
          setRecipe={setRecipe}
        />
        <CategoryKeywords
          keywordCategory="Jahreszeit"
          listOfKeywords={["Frühling", "Sommer", "Herbst", "Winter"]}
          recipe={recipe}
          setRecipe={setRecipe}
        />
        <CategoryKeywords
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
        <CategoryKeywords
          keywordCategory="Stil"
          listOfKeywords={["asiatisch", "deutsch", "italienisch", "TexMex"]}
          recipe={recipe}
          setRecipe={setRecipe}
        />
        <CategoryKeywords
          keywordCategory="Kategorie"
          listOfKeywords={["Curry", "Pesto", "Lasagne", "Nudeln", "Reis"]}
          recipe={recipe}
          setRecipe={setRecipe}
        />
      </div>
    </div>
  );
};

export default AddKeywordsStep;
