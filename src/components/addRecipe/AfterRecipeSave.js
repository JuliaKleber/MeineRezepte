import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../../stores/recipeStore";

const AfterRecipeSave = ({
  onChangeStep,
  setRecipe,
  setUploadedFile,
  isNameUnique,
}) => {
  const { currentRecipe, message } = useRecipeStore();

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
  const resetMessage = () => {
    useRecipeStore.setState({ message: "", lastLocation: '/add' });
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
            <button onClick={() => resetMessage()}>zum Rezept</button>
          </Link>
        )}
        <Link to="/">
          <button onClick={() => resetMessage()}>zum Startmenü</button>
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
