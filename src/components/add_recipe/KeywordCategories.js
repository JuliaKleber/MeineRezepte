import React, { useState } from "react";

function KeywordCategories(props) {
  const keywordCategory = props.keywordCategory;
  const listItems = props.listItems;
  const [keywordIsSelected, setKeywordIsSelected] = useState(
    Array(listItems.length).fill(false)
  );

  function handleKeywordClick(index) {
    // Erstellt eine Kopie des Arrays ingredientIsSelected.
    const newKeywordIsSelected = [...keywordIsSelected];
    // Wenn eine Zutat angeklickt wird, wird sie entweder ausgewählt,
    // wenn sie noch nicht ausgewählt war, oder sie wird abgewählt,
    // wenn sie schon ausgewählt war.
    keywordIsSelected[index]
      ? (newKeywordIsSelected[index] = false)
      : (newKeywordIsSelected[index] = true);
    // Die Liste der Zutaten wird im Elternteil aktualisiert
    newKeywordIsSelected[index]
      ? props.onKeywordSelected(listItems[index])
      : props.onKeywordDeselected(listItems[index]);
    setKeywordIsSelected(newKeywordIsSelected);
  }

  return (
    <div className="container">
      <p className="bold">{keywordCategory}</p>
      <div>
        {listItems.map((item, index) => (
          <button
            key={item}
            className={
              keywordIsSelected[index]
                ? "is-chosen-keywords"
                : "not-chosen-keywords"
            }
            onClick={() => handleKeywordClick(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default KeywordCategories;
