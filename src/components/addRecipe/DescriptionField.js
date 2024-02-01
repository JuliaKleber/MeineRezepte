import React from 'react';
const DescriptionField = ({ recipe, setRecipe }) => {
  const editDescription = (updatedDescription) => {
    setRecipe({ ...recipe, description: updatedDescription });
  };

  const descriptionField = (
    <div className='container description-field'>
      <p>Zubereitung</p>
      <textarea
        value={recipe.description}
        onChange={(e) => editDescription(e.target.value)}
        id='description-entry-field'
      ></textarea>
    </div>
  );

  return descriptionField;
}

export default DescriptionField;
