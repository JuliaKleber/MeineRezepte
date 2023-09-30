import React, { useState, useCallback } from "react";
import KeywordSearch from "./components/KeywordSearch";
import AddRecipe from "./components/AddRecipe";

function App() {
  const [isShownHome, setIsShownHome] = useState(true);

  function addRecipe() {
    setIsShownHome(false);
  }

  const handleResetToHome = useCallback((reset) => {
    setIsShownHome(reset);
  }, []);

  return (
    <div className="container">
      {isShownHome && <h1>Meine Rezepte</h1>}
      {isShownHome && <KeywordSearch />}
      {isShownHome && (
        <button onClick={addRecipe}>Neues Rezept hinzufügen</button>
      )}
      {!isShownHome && <AddRecipe onReturnHome={handleResetToHome} />}
    </div>
  );
}

export default App;
