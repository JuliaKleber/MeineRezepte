import React from "react";

function Navigation({
  onChangeStep,
  onSaveRecipeName,
  onSaveAmounts,
  onDescription,
  recipeName,
  amounts,
  description
}) {

  const navigation = (
    <span>
      <button onClick={() => onChangeStep("ingredients")}>zurück</button>
      <button
        onClick={() => {
          onChangeStep("keywords");
          onSaveRecipeName(recipeName);
          onSaveAmounts(amounts);
          onDescription(description);
        }}
      >
        weiter
      </button>
    </span>
  );

  return {navigation}
}

export default Navigation;
