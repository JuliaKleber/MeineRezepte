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
  let output = '';
  const [currentStep, setCurrentStep] = useState(steps.editRecipeStep);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleAmountUpdate = (event, index) => {
    const amounts = [...updatedRecipe.amounts];
    amounts[index] = event.target.value;
    setUpdatedRecipe({...updatedRecipe, amounts: [...amounts]});
  };

  const handleIngredientUpdate = (event, index) => {
    const ingredients = [...updatedRecipe.ingredients];
    const keywords = updatedRecipe.keywords.filter((keyword) => keyword !== ingredients[index]);
    ingredients[index] = event.target.value;
    keywords.push(event.target.value);
    setUpdatedRecipe({...updatedRecipe, ingredients: [...ingredients], keywords: [...keywords]});
  };

  const handleDeleteIngredient = (index) => {
    const keywords = updatedRecipe.keywords.filter((keyword) => keyword !== updatedRecipe.ingredients[index]);
    const ingredients = updatedRecipe.ingredients.filter((_, i) => i !== index);
    const amounts = updatedRecipe.amounts.filter((_, i) => i !== index);
    setUpdatedRecipe({...updatedRecipe, ingredients: [...ingredients], amounts: [...amounts], keywords: [...keywords]});
  };

  const handleAddIngredient = () => {
    const amounts = [...updatedRecipe.amounts];
    const ingredients = [...updatedRecipe.ingredients];
    amounts.push('');
    ingredients.push('neue Zutat');
    setUpdatedRecipe({...updatedRecipe, amounts: [...amounts], ingredients: [...ingredients]});
  }

  const handleReturn = () => {
    onReturn('', recipe);
  };

  const cleanUpRecipe = () => {
    const ingredients = [...updatedRecipe.ingredients];
    const amounts = [...updatedRecipe.amounts];
    for (let i = ingredients.length - 1; i >= 0; i--) {
      if (ingredients[i] === '') {
        ingredients.splice(i, 1);
        amounts.splice(i, 1);
      }
    }
    const cleanedRecipe = {...updatedRecipe, amounts: [...amounts], ingredients: [...ingredients]}
    setUpdatedRecipe(cleanedRecipe);
    return cleanedRecipe;
  };

  // The updated recipe is exchanged with the old one in the json file
  const replaceRecipe = () => {
    let cleanedRecipe = cleanUpRecipe();
    if (uploadedFile !== null) {
      const cleanedRecipeName = cleanedRecipe.recipeName.toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/\s+/g, '-');
      const imageName = `${cleanedRecipeName}.jpg`;
      cleanedRecipe = { ...cleanedRecipe, imageName: imageName };
    };
    // Das Rezept wird aus dem Array updatedRecipes entfernt
    // und als geändertes Rezept (updatedRecipe) wieder hinzugefügt
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.indexOf(recipe);
    updatedRecipes.splice(index, 1);
    updatedRecipes.push(cleanedRecipe);
    fetch(`${serverUrl}/updateRecipe`, {
      method: 'POST',
      // Es wird angegeben, dass die Daten
      // im JSON-Format gesendet werden.
      headers: {
        'Content-Type': 'application/json',
      },
      // Es wird das updatedRecipes-Objekt in JSON-Format
      // umgewandelt und als Datenkörper gesendet.
      body: JSON.stringify(updatedRecipes),
    })
      .then((response) => response.text())
      .then((message) => {
        // Es wird die Nachricht aus der
        // Server-Antwort in der Konsole ausgegeben.
        console.log('Antwort vom Server:', message);
        if (uploadedFile !== null) {
          const formData = new FormData();
          formData.append('image', uploadedFile, cleanedRecipe.imageName);
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
        setRecipe(cleanedRecipe);
        setRecipes(updatedRecipes);
        onReturn(output, cleanedRecipe)
      })
      .catch((error) => {
        // Fehlerbehandlung
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
              <button onClick={() => handleReturn()}>zurück</button>
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
