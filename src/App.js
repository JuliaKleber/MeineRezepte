import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipesOfMonth from './components/RecipesOfMonth';
import KeywordSearch from './components/KeywordSearch';
import ShowRecipe from './components/ShowRecipe';
import AddRecipe from './components/addRecipe/AddRecipe';

const App = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recipe, setRecipe] = useState();
  const [recipes, setRecipes] = useState([]);
  const [returnedHome, setReturnedHome] = useState(false);

  const Home = () => {
    return (
      <div className='container'>
        <RecipesOfMonth recipes={recipes} onRecipeSelection={handleShowRecipe} />
      </div>
    );
  }

  // Die Rezepte werden aus der JSON-Datei geladen.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/loadRecipes');
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
    navigate('recipe');
  };

  // Die letzten Suchergebnisse werden wieder angezeigt.
  const handleBackToSearchResults = () => {
    navigate('home');
    setReturnedHome(true);
  };

  // Die Maske zur Eingabe eines neuen Rezepts wird angezeigt.
  const handleAddRecipe = () => {
    navigate('add');
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<KeywordSearch onRecipeSelection={handleShowRecipe} searchTerm={searchTerm} recipes={recipes} />} />
        <Route path='/add' element={<AddRecipe />} />
        <Route path='/recipe' element={<ShowRecipe recipe={recipe} onBackToSearchResults={handleBackToSearchResults} recipes={recipes} setRecipes={setRecipes} />} />
      </Routes>
    </div>
  );
}

export default App;
