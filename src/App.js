import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KeywordSearch from './components/KeywordSearch';
import ShowRecipe from './components/ShowRecipe';
import AddRecipe from './components/addRecipe/AddRecipe';
import homeImage from './images/home.jpg';


const App = () => {
  const [currentStep, setCurrentStep] = useState('homeMenu');
  const [searchTerm, setSearchTerm] = useState('');
  const [recipe, setRecipe] = useState();
  const [recipes, setRecipes] = useState([]);
  const [returnedHome, setReturnedHome] = useState(false);

  // Die Rezepte werden aus der JSON-Datei geladen.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/getRecipes');
        if (response.status === 200) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Fehler beim Abrufen der Daten');
        }
      } catch (error) {
        console.error('Fehler beim Senden der Anfrage:', error);
      }
    }
    fetchData();
    setReturnedHome(false);
  }, [returnedHome]);

  // Das nach der durchgeführten Suche selektierte Rezept wird angezeigt.
  const handleShowRecipe = (selectedRecipe, latestSearchTerm) => {
    setSearchTerm(latestSearchTerm);
    setRecipe(selectedRecipe);
    setCurrentStep('showRecipe');
  };

  // Die letzten Suchergebnisse werden wieder angezeigt.
  const handleBackToSearchResults = () => {
    setCurrentStep('homeMenu');
    setReturnedHome(true);
  };

  // Die Maske zur Eingabe eines neuen Rezepts wird angezeigt.
  const handleAddRecipe = () => {
    setCurrentStep('addRecipe');
  };

  // Die Startseite wird wieder angezeigt.
  const handleReturnHome = (home) => {
    if (!home) return;
    setCurrentStep('homeMenu');
    setReturnedHome(true);
  };

  return (
    <div>
      <Navbar />
      {currentStep === 'homeMenu' && (
        <div className='container' style={{ backgroundImage: `url(${homeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '87.8vh' }}>
          <h1>Meine Rezepte</h1>
          <KeywordSearch
            onRecipeSelection={handleShowRecipe}
            searchTerm={searchTerm}
            recipes={recipes}
          />
          <button onClick={handleAddRecipe}>Neues Rezept hinzufügen</button>
        </div>
      )}
      {currentStep === 'showRecipe' && (
        <ShowRecipe
          recipe={recipe}
          onBackToSearchResults={handleBackToSearchResults}
          recipes={recipes}
        />
      )}
      {currentStep === 'addRecipe' && (
        <AddRecipe onReturnHome={handleReturnHome} />
      )}
    </div>
  );
}

export default App;
