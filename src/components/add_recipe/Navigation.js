import React from "react";

function Navigation({
  onChangeStep,
  steps,
  indexOfPreviousStep,
  indexOfNextStep,
}) {
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
}

export default Navigation;
