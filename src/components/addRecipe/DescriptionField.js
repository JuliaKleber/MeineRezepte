import React from "react";
const DescriptionField = ({ recipe, setRecipe }) => {
  const handleDescriptionChange = (updatedDescription) => {
    setRecipe({ ...recipe, description: updatedDescription });
  };

  const descriptionField = (
    <div className="container">
      <p>Zubereitung</p>
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
