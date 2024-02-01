import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../../stores/recipeStore";

const AfterRecipeSave = ({ onChangeStep, setRecipe, setUploadedFile, isNameUnique }) => {
  const { currentRecipe, message } = useRecipeStore();
  console.log(currentRecipe);
  
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

  const resetMessage = () => {
    useRecipeStore.setState({ message: "" });
  };

  return (
    <div className="container">
      <p className="align-center">{message}</p>
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
          <button>zum Startmenü</button>
        </Link>
      </div>
    </div>
  );
};

export default AfterRecipeSave;
