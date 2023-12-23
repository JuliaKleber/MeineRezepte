import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AiFillDelete } from 'react-icons/ai';
import ShowImage from './ShowImage';
import ImageUpload from './addRecipe/ImageUpload';
import AddKeywordsStep from './addRecipe/AddKeywordsStep';

const steps = {
  editRecipeStep: 'editRecipeStep',
  editKeywordsStep: 'editKeywordsStep',
};

const EditRecipe = ({ recipe, setRecipe, recipes, setRecipes, onReturn }) => {
  const serverUrl = 'http://localhost:3001';
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const [currentStep, setCurrentStep] = useState(steps.editRecipeStep);
  const [uploadedFile, setUploadedFile] = useState(null);;
  let output = '';

  // An amount is updated
  const handleAmountUpdate = (event, index) => {
    const amounts = [...updatedRecipe.amounts];
    amounts[index] = event.target.value;
    setUpdatedRecipe({...updatedRecipe, amounts: [...amounts]});
  };

  // An ingredient is updated, the corresponding keyword is removed and a new keyword which equals the ingredient is added
  const handleIngredientUpdate = (event, index) => {
    const ingredients = [...updatedRecipe.ingredients];
    const keywords = updatedRecipe.keywords.filter((keyword) => keyword !== ingredients[index]);
    ingredients[index] = event.target.value;
    keywords.push(event.target.value);
    setUpdatedRecipe({...updatedRecipe, ingredients: [...ingredients], keywords: [...keywords]});
  };

  // An ingredient together with the corresponding amount is removed from the recipe
  const handleDeleteIngredient = (index) => {
    const keywords = updatedRecipe.keywords.filter((keyword) => keyword !== updatedRecipe.ingredients[index]);
    const ingredients = updatedRecipe.ingredients.filter((_, i) => i !== index);
    const amounts = updatedRecipe.amounts.filter((_, i) => i !== index);
    setUpdatedRecipe({...updatedRecipe, ingredients: [...ingredients], amounts: [...amounts], keywords: [...keywords]});
  };

  // A new ingredient (namely 'neue Zutat') is added to the recipe
  const handleAddIngredient = () => {
    const amounts = [...updatedRecipe.amounts];
    const ingredients = [...updatedRecipe.ingredients];
    amounts.push('');
    ingredients.push('neue Zutat');
    setUpdatedRecipe({...updatedRecipe, amounts: [...amounts], ingredients: [...ingredients]});
  }

  // The recipe is cleaned up before it is exchanged with the old one in the json file
  // i.e. empty ingredients are removed
  // const cleanUpRecipe = (savedRecipe) => {
  //   const ingredients = [...savedRecipe.ingredients];
  //   const amounts = [...savedRecipe.amounts];
  //   for (let i = ingredients.length - 1; i >= 0; i--) {
  //     if (ingredients[i] === '') {
  //       ingredients.splice(i, 1);
  //       amounts.splice(i, 1);
  //     }
  //   }
  //   const cleanedRecipe = {...savedRecipe, amounts: [...amounts], ingredients: [...ingredients]}
  //   return cleanedRecipe;
  // };

  // The image name is set
  const setImageName = () => {
    const recipeName = updatedRecipe.recipeName.toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/é/g, 'e')
      .replace(/è/g, 'e')
      .replace(/\s+/g, '-');
    const imageName = `${recipeName}.jpg`;
    return { ...updatedRecipe, imageName: imageName };
  };

  // The original recipe is exchanged with the updated one in the recipes array
  const exchangeRecipes = (savedRecipe) => {
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.indexOf(recipe);
    updatedRecipes.splice(index, 1);
    updatedRecipes.push(savedRecipe);
    return updatedRecipes;
  };

  // The original recipe is exchanged with the updated one in the json file
  const replaceRecipe = () => {
    let savedRecipe = updatedRecipe;
    if (uploadedFile !== null & updatedRecipe.recipeName !== null) {
      savedRecipe = setImageName();
    };
    // savedRecipe = cleanUpRecipe(savedRecipe);
   const updatedRecipes = exchangeRecipes(savedRecipe);
    fetch(`${serverUrl}/updateRecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipes),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log('Antwort vom Server:', message);
        if (uploadedFile !== null) {
          const formData = new FormData();
          formData.append('image', uploadedFile, savedRecipe.imageName);
          fetch(`${serverUrl}/addRecipeImage`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.text())
            .then((imageMessage) => {
              console.log('Bild hochgeladen:', imageMessage);
            })
            .catch((imageError) => {
              console.error('Fehler beim Hochladen des Bildes:', imageError);
            });
        }
        output = 'Das Rezept wurde geändert.';
        setRecipe(savedRecipe);
        setRecipes(updatedRecipes);
        onReturn(output, savedRecipe)
      })
      .catch((error) => {
        console.error('Fehler beim Senden der Daten:', error);
        output = 'Das Rezept konnte nicht geändert werden.';
      });
  };

  return (
    <div className='edit-recipe'>
      {currentStep === steps.editRecipeStep && (
        <div className='container'>
          <ShowImage recipe={recipe} className='card' />
          <ImageUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} text="Klicke, um das aktuelle Bild zu ersetzen." />
          <input
            value={updatedRecipe.recipeName}
            onChange={(event) => setUpdatedRecipe({...updatedRecipe, recipeName: event.target.value})}
            className='card'
            id='recipe-name'
          />

          <div className='card'>
            <div className='align-center primary-color'>
              Zutaten für
              <input
                id='number-of-persons'
                value={updatedRecipe.numberOfPersons}
                onChange={(e) => setUpdatedRecipe({...updatedRecipe, numberOfPersons: e.target.value})}
              />
              {updatedRecipe.numberOfPersons === 1 || updatedRecipe.numberOfPersons === '1'
                ? 'Person'
                : 'Personen'}
            </div>

            <table>
              <tbody>
                {updatedRecipe.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td className='align-right'>
                      <input
                        className='amounts-fields'
                        value={updatedRecipe.amounts[index]}
                        onChange={(event) => handleAmountUpdate(event, index)}
                      ></input>
                    </td>
                    <td>
                      <input
                        className='ingredients-fields'
                        value={ingredient}
                        onChange={(event) => handleIngredientUpdate(event, index)}
                      ></input>
                    </td>
                    <td>
                      <AiFillDelete
                        className='delete-button primary-color'
                        onClick={(e) => handleDeleteIngredient(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='align-center'>
              <button
                className='reverse-colored-button'
                id='add-ingredient-button'
                onClick={handleAddIngredient}
              >
              <FontAwesomeIcon icon={faPlus} /> Zutat
              </button>
            </div>
          </div>

          <textarea
            className='card'
            id='description'
            value={updatedRecipe.description}
            onChange={(event) => setUpdatedRecipe({...updatedRecipe, description: event.target.value})}
          ></textarea>

          <div className='container'>
            <button onClick={() => setCurrentStep(steps.editKeywordsStep)}>Schlagwörter ändern</button>
            <span>
              <button onClick={() => onReturn('', recipe)}>zurück</button>
              <button onClick={() => replaceRecipe()}>speichern</button>
            </span>
          </div>

          <div className='secondary-color'>
            <i class="fa-solid fa-circle-info"></i>
            {output}
          </div>

        </div>
      )}

      { currentStep === steps.editKeywordsStep && (
        <div>
          <AddKeywordsStep recipe={updatedRecipe} setRecipe={setUpdatedRecipe} />
          <div className='container-vertical-alignment margin-top'>
            <button onClick={() => setCurrentStep(steps.editRecipeStep)}>zurück</button>
            <button onClick={() => replaceRecipe()}>speichern</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default EditRecipe;
