import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  const [orderedIngredients, setOrderedIngredients] = useState(ingredients);

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

  // Speichert die Reihenfolge der Zutaten nach der Drag-and-Drop-Aktion
  const onDragEnd = (result) => {
    // Abbruch, wenn das Element nicht verschoben wurde
    if (!result.destination) return;
    const reorderedIngredients = [...orderedIngredients];
    const [movedIngredient] = reorderedIngredients.splice(
      result.source.index,
      1
    );
    reorderedIngredients.splice(result.destination.index, 0, movedIngredient);
    setOrderedIngredients(reorderedIngredients); // Ändern Sie diese Zeile
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="ingredients">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {ingredients.map((ingredient, index) => (
                  <Draggable
                    key={ingredient}
                    draggableId={ingredient}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
