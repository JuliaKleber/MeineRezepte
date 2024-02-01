import React, { useState } from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AiFillDelete } from "react-icons/ai";
import ShowImage from "../components/ShowImage";
import ImageUpload from "../components/addRecipe/ImageUpload";
import AddKeywordsStep from "../components/addRecipe/AddKeywordsStep";

const steps = {
  editRecipeStep: "editRecipeStep",
  editKeywordsStep: "editKeywordsStep",
};

const EditRecipe = () => {
  const { recipes, currentRecipe, updateRecipe } = useRecipeStore();
  const [updatedRecipe, setUpdatedRecipe] = useState(currentRecipe);
  const [currentStep, setCurrentStep] = useState(steps.editRecipeStep);
  const [uploadedFile, setUploadedFile] = useState(null);

  // An amount is updated
  const handleAmountUpdate = (event, index) => {
    const amounts = [...updatedRecipe.amounts];
    amounts[index] = event.target.value;
    setUpdatedRecipe({ ...updatedRecipe, amounts: [...amounts] });
  };

  // An ingredient is updated, the corresponding keyword is removed
  // and a new keyword which equals the ingredient is added
  const handleIngredientUpdate = (event, index) => {
    const ingredients = [...updatedRecipe.ingredients];
    const keywords = updatedRecipe.keywords.filter(
      (keyword) => keyword !== ingredients[index]
    );
    ingredients[index] = event.target.value;
    keywords.push(event.target.value);
    setUpdatedRecipe({
      ...updatedRecipe,
      ingredients: [...ingredients],
      keywords: [...keywords],
    });
  };

  // An ingredient together with the corresponding amount is removed from the recipe
  const handleDeleteIngredient = (index) => {
    const keywords = updatedRecipe.keywords.filter(
      (keyword) => keyword !== updatedRecipe.ingredients[index]
    );
    const ingredients = updatedRecipe.ingredients.filter((_, i) => i !== index);
    const amounts = updatedRecipe.amounts.filter((_, i) => i !== index);
    setUpdatedRecipe({
      ...updatedRecipe,
      ingredients: [...ingredients],
      amounts: [...amounts],
      keywords: [...keywords],
    });
  };

  // A new ingredient (namely 'neue Zutat') is added to the recipe
  const handleAddIngredient = () => {
    const amounts = [...updatedRecipe.amounts];
    const ingredients = [...updatedRecipe.ingredients];
    amounts.push("");
    ingredients.push("neue Zutat");
    setUpdatedRecipe({
      ...updatedRecipe,
      amounts: [...amounts],
      ingredients: [...ingredients],
    });
  };

  // The image name is set
  const setImageName = () => {
    const recipeName = updatedRecipe.name
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/é/g, "e")
      .replace(/è/g, "e")
      .replace(/\s+/g, "-");
    const imageName = `${recipeName}.jpg`;
    return { ...updatedRecipe, imageName: imageName };
  };

  // The original recipe is exchanged with the updated one in the json file
  const replaceRecipeInDatabase = async () => {
    let savedRecipe = updatedRecipe;
    if (uploadedFile !== null) {
      savedRecipe = setImageName();
      setUpdatedRecipe(savedRecipe);
    }
    const index = recipes.indexOf(currentRecipe);
    const updatedRecipes = [...recipes, savedRecipe];
    updatedRecipes.splice(index, 1);
    await updateRecipe(
      updatedRecipes,
      savedRecipe,
      uploadedFile,
      currentRecipe.imageName
    );
  };

  return (
    <div className="edit-recipe">
      {currentStep === steps.editRecipeStep && (
        <div className="container">
          <ShowImage recipe={currentRecipe} className="card" />
          <ImageUpload
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            text="Klicke, um das aktuelle Bild zu ersetzen."
          />
          <input
            value={updatedRecipe.name}
            onChange={(event) =>
              setUpdatedRecipe({
                ...updatedRecipe,
                name: event.target.value,
              })
            }
            className="card"
            id="recipe-name"
          />

          <div className="card">
            <div className="align-center primary-color">
              Zutaten für
              <input
                id="number-of-persons"
                value={updatedRecipe.numberOfPersons}
                onChange={(e) =>
                  setUpdatedRecipe({
                    ...updatedRecipe,
                    numberOfPersons: e.target.value,
                  })
                }
              />
              {updatedRecipe.numberOfPersons === 1 ||
              updatedRecipe.numberOfPersons === "1"
                ? "Person"
                : "Personen"}
            </div>

            <table>
              <tbody>
                {updatedRecipe.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td className="align-right">
                      <input
                        className="amounts-fields"
                        value={updatedRecipe.amounts[index]}
                        onChange={(event) => handleAmountUpdate(event, index)}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="ingredients-fields"
                        value={ingredient}
                        onChange={(event) =>
                          handleIngredientUpdate(event, index)
                        }
                      ></input>
                    </td>
                    <td>
                      <AiFillDelete
                        className="delete-button primary-color"
                        onClick={(e) => handleDeleteIngredient(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="align-center">
              <button
                className="reverse-colored-button"
                id="add-ingredient-button"
                onClick={handleAddIngredient}
              >
                <FontAwesomeIcon icon={faPlus} /> Zutat
              </button>
            </div>
          </div>

          <textarea
            className="card"
            id="description"
            value={updatedRecipe.description}
            onChange={(event) =>
              setUpdatedRecipe({
                ...updatedRecipe,
                description: event.target.value,
              })
            }
          ></textarea>

          <div className="container">
            <button onClick={() => setCurrentStep(steps.editKeywordsStep)}>
              Schlagwörter ändern
            </button>
            <span>
              {currentRecipe && (
                <Link to={`/recipes/${currentRecipe.name
                  .replaceAll(" ", "-")
                  .toLowerCase()}`}>
                  <button>zurück</button>
                </Link>
              )}
              <Link to={`/recipes/${currentRecipe.name
                  .replaceAll(" ", "-")
                  .toLowerCase()}`}
                onClick={() => replaceRecipeInDatabase()}
              >
                <button>speichern</button>
              </Link>
            </span>
          </div>
        </div>
      )}

      {currentStep === steps.editKeywordsStep && (
        <div>
          <AddKeywordsStep
            recipe={updatedRecipe}
            setRecipe={setUpdatedRecipe}
          />
          <div className="container-vertical-alignment margin-top">
            <button onClick={() => setCurrentStep(steps.editRecipeStep)}>
              zurück
            </button>
            <Link
              to={`/recipes/${currentRecipe.name
                .replaceAll(" ", "-")
                .toLowerCase()}`}
            >
              <button onClick={() => replaceRecipeInDatabase()}>
                speichern
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRecipe;
