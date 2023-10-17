import React, { useState } from "react";

function KeywordCategories({
  onKeywordSelected,
  onKeywordDeselected,
  keywordCategory,
  listOfKeywords,
}) {
  const [keywordIsSelected, setKeywordIsSelected] = useState(
    Array(listOfKeywords.length).fill(false)
  );

  const keywords = (
    <div>
      {listOfKeywords.map((keyword, index) => (
        <button
          key={keyword}
          className={
            keywordIsSelected[index]
              ? "is-chosen-keywords"
              : "not-chosen-keywords"
          }
          onClick={() => handleKeywordClick(index)}
        >
          {keyword}
        </button>
      ))}
    </div>
  );

  function handleKeywordClick(index) {
    // Erstellt eine Kopie des Arrays keywordIsSelected.
    const newKeywordIsSelected = [...keywordIsSelected];
    // Wenn ein Schlagwort angeklickt wird, wird es entweder ausgewählt,
    // wenn es noch nicht ausgewählt war, oder es wird abgewählt,
    // wenn es schon ausgewählt war.
    keywordIsSelected[index]
      ? (newKeywordIsSelected[index] = false)
      : (newKeywordIsSelected[index] = true);
    // Die Liste der Schlagwörter wird im Elternteil aktualisiert
    newKeywordIsSelected[index]
      ? onKeywordSelected(listOfKeywords[index])
      : onKeywordDeselected(listOfKeywords[index]);
    setKeywordIsSelected(newKeywordIsSelected);
  }

  return (
    <div className="container">
      <p className="bold">{keywordCategory}</p>
      {keywords}
    </div>
  );
}

export default KeywordCategories;
