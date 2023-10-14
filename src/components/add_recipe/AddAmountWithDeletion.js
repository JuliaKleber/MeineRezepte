import React, { useState, useEffect, useRef } from "react";

function AddAmounts({
  ingredients,
  onChangeStep,
  onSaveRecipeName,
  onSaveAmounts,
  onDescription,
}) {
  const [recipeName, setRecipeName] = useState("");
  const recipeNameInputRef = useRef(null);
  const [amounts, setAmounts] = useState(Array(ingredients.length).fill(""));
  const [description, setDescription] = useState("");
  const [swipedIndex, setSwipedIndex] = useState(null);
  const [deletedIndexes, setDeletedIndexes] = useState([]);

  /*const handleSwipe = (index) => {
    setDeletedIndexes([...deletedIndexes, index]);
  };*/

  const handleMouseDown = (index, e) => {
    if (e.button === 0) {
      // Nur wenn die linke Maustaste geklickt wurde
      setSwipedIndex(index);
      // Hier können Sie die Anfangsposition der Maus speichern
    }
  };

  const handleMouseMove = (e) => {
    if (swipedIndex !== null) {
      // Hier können Sie die Bewegung der Maus verfolgen und das Element verschieben
    }
  };

  const handleMouseUp = () => {
    if (swipedIndex !== null) {
      // Hier können Sie das Element zurücksetzen oder es als gelöscht markieren
      setSwipedIndex(null);
    }
  };

  const handleLeftClick = (index, e) => {
    e.preventDefault(); // Verhindern Sie das Kontextmenü der rechten Maustaste
    setDeletedIndexes([...deletedIndexes, index]);
  };

  // Speichert den Rezeptnamen
  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  // Wenn die Anzahl der Zutaten sich ändert,
  // wird ein 'leeres' Array für die Mengen der Zutaten erstellt.
  useEffect(() => {
    setAmounts(Array(ingredients.length).fill(""));
  }, [ingredients]);

  // Speichert die Menge der Zutaten
  const handleAmountChange = (value, index) => {
    let newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  // Speichert die Anleitung
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="container">
      <div className="container">
        Name des Rezepts
        <br />
        <input
          type="text"
          ref={recipeNameInputRef}
          value={recipeName}
          onChange={handleRecipeNameChange}
        />
      </div>
      <div id="ingredientAmountEntry">
        {ingredients.map((ingredient, index) => (
          <div key={index}
          className={`ingredient-item ${deletedIndexes.includes(index) ? 'swipe-out' : ''}`}
          onMouseDown={(e) => handleMouseDown(index, e)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => handleLeftClick(index, e)} // rechten Mausklick behandeln
        >
            <input
              type="text"
              id={ingredient}
              className="amounts"
              value={amounts[index]}
              onChange={(event) =>
                handleAmountChange(event.target.value, index)
              }
            />
            {ingredient}
          </div>
        ))}
      </div>
      <div className="container">
        <p className="center">Zubereitung</p>
        <textarea
          id="description"
          onChange={handleDescriptionChange}
          value={description}
        ></textarea>
      </div>
      <span>
        <button onClick={() => onChangeStep("ingredients")}>zurück</button>
        <button
          onClick={() => {
            onChangeStep("keywords");
            onSaveRecipeName(recipeName);
            onSaveAmounts(amounts);
            onDescription(description);
          }}
        >
          weiter
        </button>
      </span>
    </div>
  );
}

export default AddAmounts;

/*  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd(ingredientChosen)}*/

/* const handleTouchStart = (event) => {
    // event.touches ist ein Array von Touch-Objekten.
    // Da nur ein Finger auf dem Bildschirm ist, gibt es nur das eine (erste) Objekt.
    // clientX: x-Koordinate des Berührungspunktes in Bezug auf das Client-Fenster
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = (ingredientChosen) => {
    if (touchStartX && touchEndX && touchStartX - touchEndX > 50) {
      // Das Element wurde nach links gewischt
      removeIngredient(ingredientChosen);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };*/
