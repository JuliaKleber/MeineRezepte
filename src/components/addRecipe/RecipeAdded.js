import React from "react";
import { Link } from "react-router-dom";

const RecipeAdded = ({ onChangeStep, setRecipe }) => {
  const enterNewRecipe = () => {
    setRecipe({
      name: "",
      amounts: [],
      ingredients: [],
      description: "",
      keywords: [],
    });
    onChangeStep("addIngredientsStep");
  };

  return (
    <div className="container">
      <p className="align-center">
        Das Rezept wurde der Datenbank hinzugefügt.
      </p>
      <button onClick={() => enterNewRecipe()}>
        weiteres Rezept hinzufügen
      </button>
      <Link to='/'>
        <button>zum Startmenü</button>
      </Link>
    </div>
  );
};

export default RecipeAdded;
