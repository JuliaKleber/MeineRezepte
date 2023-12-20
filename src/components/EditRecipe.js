import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AiFillDelete } from 'react-icons/ai';
import pastaImage from '../images/pasta.jpg';
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

  const handleAmountUpdate = (event, index) => {
    const amounts = [...updatedRecipe.amounts];
    amounts[index] = event.target.value;
    setUpdatedRecipe({...updatedRecipe, amounts: [...amounts]});
  };

  const handleIngredientUpdate = (event, index) => {
    const ingredients = [...updatedRecipe.ingredients];
    const keywords = updatedRecipe.keywords.filter((_, i) => i !== index);
    ingredients[index] = event.target.value;
    keywords.push(event.target.value);
    setUpdatedRecipe({...updatedRecipe, ingredients: [...ingredients], keywords: [...keywords]});
  };

  const handleDeleteIngredient = (index) => {
    const keywords = updatedRecipe.keywords.filter((keyword) => keyword !== ingredients[index]);
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
    onReturn('');
  };

  const handleSave = () => {
    const ingredients = [...updatedRecipe.ingredients];
    const amounts = [...updatedRecipe.amounts];
    for (let i = ingredients.length - 1; i >= 0; i--) {
      if (ingredients[i] === '') {
        ingredients.splice(i);
        amounts.splice(i);
      }
    }
    setUpdatedRecipe({...updatedRecipe, amounts: [...amounts], ingredients: [...ingredients]});
    replaceRecipe();
  };

  // The updated recipe is exchanged with the old one in the json file
  const replaceRecipe = () => {
    // Das Rezept wird aus dem Array updatedRecipes entfernt
    // und als geändertes Rezept (updatedRecipe) wieder hinzugefügt
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.indexOf(recipe);
    updatedRecipes.splice(index);
    updatedRecipes.push(updatedRecipe);
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
        output = 'Das Rezept wurde geändert.';
        setRecipe(updatedRecipe);
        setRecipes(updatedRecipes);
        onReturn(output)
      })
      .catch((error) => {
        // Fehlerbehandlung
        console.error('Fehler beim Senden der Daten:', error);
        output = 'Das Rezept konnte nicht geändert werden.';
      });
  };

  return (
    <div className='container edit-recipe'>
      {currentStep === steps.editRecipeStep && (
        <div>
          <img src={pastaImage} alt='recipe_picture' width='300px' />
          <input
            value={updatedRecipe.recipeName}
            // style={{ width: recipeName.length * 0.6 + 'em' }}
            onChange={(event) => setUpdatedRecipe({...updatedRecipe, recipeName: event.target.value})}
            className='recipe-change card'
            id='recipe-name'
          ></input>
          <div className='recipe-change card'>
            <p className='center'>
              Zutaten für 1 Person
            </p>
            <table>
              <tbody>
                {updatedRecipe.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td className='align-right'>
                      <input
                        className='recipe-change amounts-fields'
                        value={updatedRecipe.amounts[index]}
                        style={(updatedRecipe.amounts[index].length === 0) ? { width: '50px' } : { width: updatedRecipe.amounts[index].length * 0.6 + 'em' }}
                        onChange={(event) => handleAmountUpdate(event, index)}
                      ></input>
                    </td>
                    <td>
                      <input
                        className='recipe-change ingredients-fields'
                        value={ingredient}
                        style={{ width: ingredient.length * 0.6 + 'em' }}
                        onChange={(event) => handleIngredientUpdate(event, index)}
                      ></input>
                    </td>
                    <td>
                    <AiFillDelete
                      className='delete-button'
                      onClick={(e) => handleDeleteIngredient(index)}
                    />
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className='recipe-change reverse-colored-button'
              id='add-ingredient-button'
              onClick={handleAddIngredient}
            >
              <FontAwesomeIcon icon={faPlus} /> Zutat
            </button>
          </div>
          <textarea
            className='recipe-change card'
            id='description'
            value={updatedRecipe.description}
            onChange={(event) => setUpdatedRecipe({...updatedRecipe, description: event.target.value})}
          ></textarea>
          <div className='container'>
            <button onClick={() => setCurrentStep(steps.editKeywordsStep)}>Schlagwörter ändern</button>
            <span>
              <button onClick={handleReturn}>zurück</button>
              <button onClick={handleSave}>speichern</button>
            </span>
          </div>
          {output}
        </div>
      )}
      { currentStep === steps.editKeywordsStep && (
        <div>
          <AddKeywordsStep recipe={updatedRecipe} setRecipe={setUpdatedRecipe} />
          <div className='container-vertical-alignment margin-top'>
            <button onClick={() => setCurrentStep(steps.editRecipeStep)}>zurück</button>
            <button onClick={handleSave}>speichern</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditRecipe;
