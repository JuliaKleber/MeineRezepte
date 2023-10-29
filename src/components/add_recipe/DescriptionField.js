import React from "react";

function DescriptionField({ recipe, setRecipe }) {
  const handleDescriptionChange = (updatedDescription) => {
    setRecipe({ ...recipe, description: updatedDescription });
  };

  const descriptionField = (
    <div className="container">
      <p className="center">Zubereitung</p>
      <textarea
        value={recipe.description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        id="description-entry-field"
      ></textarea>
    </div>
  );

  return descriptionField;
}

export default DescriptionField;
