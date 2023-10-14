import React, { useState, useEffect } from "react";
import KeywordCategories from "./KeywordCategories";

function AddKeywords(props) {
  const { oldKeywords } = props;
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    setKeywords([...oldKeywords]);
  }, []);

  // Schlagwort wird der Liste der Schlagwörter hinzugefügt.
  const addKeyword = (keyword) => {
    setKeywords([...keywords, keyword]);
  };

  // Schlagwort wird aus der Liste der Schlagwörter entfernt.
  const removeKeyword = (keyword) => {
    let newKeywords = [...keywords];
    const index = newKeywords.indexOf(keyword);
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  return (
    <div>
      <KeywordCategories
        keywordCategory="Ernährungsform"
        listItems={["vegan", "vegetarisch"]}
        onKeywordSelected={addKeyword}
        onKeywordDeselected={removeKeyword}
      />
      <KeywordCategories
        keywordCategory="Zeitbedarf"
        listItems={["schnell", "mittel", "aufwändig"]}
        onKeywordSelected={addKeyword}
        onKeywordDeselected={removeKeyword}
      />
      <KeywordCategories
        keywordCategory="Jahreszeit"
        listItems={["Frühling", "Sommer", "Herbst", "Winter"]}
        onKeywordSelected={addKeyword}
        onKeywordDeselected={removeKeyword}
      />
      <KeywordCategories
        keywordCategory="Saison der Hauptzutaten"
        listItems={[
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
        onKeywordSelected={addKeyword}
        onKeywordDeselected={removeKeyword}
      />
      <KeywordCategories
        keywordCategory="Stil"
        listItems={[
          "asiatisch",
          "deutsch",
          "italienisch",
          "TexMex",
          "Sonstiges",
        ]}
        onKeywordSelected={addKeyword}
        onKeywordDeselected={removeKeyword}
      />
      <KeywordCategories
        keywordCategory="Kategorie"
        listItems={["Curry", "Lasagne", "Nudeln", "Sonstiges"]}
        onKeywordSelected={addKeyword}
        onKeywordDeselected={removeKeyword}
      />
    </div>
  );
}

export default AddKeywords;
