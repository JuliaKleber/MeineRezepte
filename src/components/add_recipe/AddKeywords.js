import React from "react";
import KeywordCategories from "./KeywordCategories";

function AddKeywords({ setRecipe }) {
  // Schlagwort wird der Liste der Schlagwörter hinzugefügt.
  const handleAddKeyword = (keyword) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      keywords: [...prevRecipe.keywords, keyword],
    }));
  };

  // Schlagwort wird aus der Liste der Schlagwörter entfernt.
  const handleRemoveKeyword = (keyword) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      keywords: [...prevRecipe.keywords.filter((k) => k !== keyword)],
    }));
  };

  return (
    <>
      <KeywordCategories
        keywordCategory="Ernährungsform"
        listOfKeywords={["vegan", "vegetarisch"]}
        onKeywordSelected={handleAddKeyword}
        onKeywordDeselected={handleRemoveKeyword}
      />
      <KeywordCategories
        keywordCategory="Zeitbedarf"
        listOfKeywords={["schnell", "mittel", "aufwändig"]}
        onKeywordSelected={handleAddKeyword}
        onKeywordDeselected={handleRemoveKeyword}
      />
      <KeywordCategories
        keywordCategory="Jahreszeit"
        listOfKeywords={["Frühling", "Sommer", "Herbst", "Winter"]}
        onKeywordSelected={handleAddKeyword}
        onKeywordDeselected={handleRemoveKeyword}
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
        onKeywordSelected={handleAddKeyword}
        onKeywordDeselected={handleRemoveKeyword}
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
        onKeywordSelected={handleAddKeyword}
        onKeywordDeselected={handleRemoveKeyword}
      />
      <KeywordCategories
        keywordCategory="Kategorie"
        listOfKeywords={["Curry", "Lasagne", "Nudeln", "Sonstiges"]}
        onKeywordSelected={handleAddKeyword}
        onKeywordDeselected={handleRemoveKeyword}
      />
    </>
  );
}

export default AddKeywords;
