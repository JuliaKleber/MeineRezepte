import React from "react";

const Navigation = ({
  onChangeStep,
  steps,
  indexOfPreviousStep,
  indexOfNextStep,
}) => {
  // Handles the back and forth navigation within the AddRecipe component.
  const navigation = (
    <span className="container-vertical-alignment">
      <button onClick={() => onChangeStep(steps[indexOfPreviousStep])}>
        zurück
      </button>
      <button
        onClick={() => {
          onChangeStep(steps[indexOfNextStep]);
        }}
      >
        weiter
      </button>
    </span>
  );

  return navigation;
};

export default Navigation;
