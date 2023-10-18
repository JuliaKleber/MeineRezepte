import React, { useState } from "react";

function DescriptionField( { description, onDescriptionChange}) {

  const descriptionField = (
    <div className="container">
      <p className="center">Zubereitung</p>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        id="description-entry-field"
      ></textarea>
    </div>
  );

  return descriptionField
}

export default DescriptionField;
