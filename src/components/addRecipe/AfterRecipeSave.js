import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../../stores/recipeStore";

const AfterRecipeSave = ({
  onChangeStep,
  setRecipe,
  setUploadedFile,
  isNameUnique,
}) => {
  const currentRecipe = useRecipeStore((state) => state.currentRecipe);
  const message = useRecipeStore((state) => state.message);
  const resetMessage = useRecipeStore((state) => state.resetMessage);
  const setLastLocation = useRecipeStore((state) => state.setLastLocation);

  // The AddRecipe component is being reset so that a new recipe can be added.
  const enterNewRecipe = () => {
    setRecipe({
      name: "",
      numberOfPersons: 1,
      amounts: [],
      ingredients: [],
      description: "",
      keywords: [],
      imageName: null,
    });
    setUploadedFile(null);
    isNameUnique = true;
    onChangeStep("addIngredientsStep");
  };

  // The message in the recipeStore is set to ''.
  const redirect = (location) => {
    resetMessage();
    setLastLocation(location);
  };

  const navigationButtons = (
    <>
      {currentRecipe && (
        <button onClick={() => enterNewRecipe()}>
          weiteres Rezept hinzufügen
        </button>
      )}
      <div>
        {currentRecipe && (
          <Link
            to={`/recipes/${currentRecipe.name
              .replaceAll(" ", "-")
              .toLowerCase()}`}
          >
            <button onClick={() => redirect('/add')}>zum Rezept</button>
          </Link>
        )}
        <Link to="/">
          <button onClick={() => redirect('/')}>zum Startmenü</button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="container">
      <p className="align-center message">{message}</p>
      {navigationButtons}
    </div>
  );
};

export default AfterRecipeSave;
