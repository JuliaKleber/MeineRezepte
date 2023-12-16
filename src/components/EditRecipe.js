import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AiFillDelete } from 'react-icons/ai';
import pastaImage from '../images/pasta.jpg';

const EditRecipe = ({ recipe, recipes, onReturn }) => {
  const serverUrl = 'http://localhost:3001';
  const [recipeName, setRecipeName] = useState(recipe.recipeName);
  const [amounts, setAmounts] = useState(recipe.amounts);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [description, setDescription] = useState(recipe.description);
  const [output, setOutput] = useState('');

  const updatedRecipe = {
    recipeName: recipeName,
    amounts: amounts,
    ingredients: ingredients,
    description: description,
    keywords: recipe.keywords,
  };

  const handleAmountUpdate = (event, index) => {
    const newAmounts = [...amounts];
    newAmounts[index] = event.target.value;
    setAmounts(newAmounts);
  };

  const handleIngredientUpdate = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    const newAmounts = recipe.amounts.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    setAmounts(newAmounts);
  };

  const handleAddIngredient = () => {
    const newAmounts = [...amounts];
    const newIngredients = [...ingredients];
    newAmounts.push('');
    newIngredients.push('neue Zutat');
    setAmounts(newAmounts);
    setIngredients(newIngredients);
  };

  const handleReturn = () => {
    onReturn('');
  };

  const handleSave = () => {
    const newIngredients = [...ingredients];
    const newAmounts = [...amounts];
    for (let i = newIngredients.length - 1; i >= 0; i--) {
      if (newIngredients[i] === '') {
        newIngredients.splice(i);
        newAmounts.splice(i);
      }
    }
    setIngredients(newIngredients);
    setAmounts(newAmounts);
    replaceRecipe();
  };

  // The updated recipe is exchanged with the old one in the json file
  const replaceRecipe = (recipe) => {
    // Das Rezept wird aus dem Array updatedRecipes entfernt
    // und als updatedRecipe wieder hinzugefügt
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.indexOf(recipe);
    updatedRecipes.splice(index, 1);
    updatedRecipes.push(updatedRecipe);
    fetch(`${serverUrl}/updateRecipe`, {
      // Es wird die HTTP-Methode POST verwendet,
      // um Daten an den Server zu senden.
      method: 'POST',
      // Es wird angegeben, dass die Daten
      // im JSON-Format gesendet werden.
      headers: {
        'Content-Type': 'application/json',
      },
      // Es wird das Rezept-Objekt in JSON-Format
      // umgewandelt und als Datenkörper gesendet.
      body: JSON.stringify(updatedRecipes),
    })
      .then((response) => response.text())
      .then((message) => {
        // Es wird die Nachricht aus der
        // Server-Antwort in der Konsole ausgegeben.
        console.log('Antwort vom Server:', message);
        setOutput('Das Rezept wurde geändert.');
        onReturn(output, updatedRecipe)
      })
      .catch((error) => {
        // Fehlerbehandlung
        console.error('Fehler beim Senden der Daten:', error);
        setOutput('Das Rezept konnte nicht geändert werden.');
      });
  };

  return (
    <div className='container edit-recipe'>
      <input
        value={recipeName}
        // style={{ width: recipeName.length * 0.6 + 'em' }}
        onChange={(event) => setRecipeName(event.target.value)}
        className='recipe-change card'
        id='recipe-name'
      ></input>
      <img src={pastaImage} alt='recipe_picture' width='300px' />
      <div className='recipe-change card'>
        <p className='center'>
          Zutaten für 1 Person
        </p>
        <table>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td className='align-right'>
                  <input
                    className='recipe-change amounts-fields'
                    value={amounts[index]}
                    style={(amounts[index].length === 0) ? { width: '50px' } : { width: amounts[index].length * 0.6 + 'em' }}
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
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <span>
        <button onClick={handleReturn}>zurück</button>
        <button onClick={handleSave}>speichern</button>
      </span>
      {output}
    </div>
  );
}

export default EditRecipe;
