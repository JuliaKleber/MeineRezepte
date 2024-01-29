export const getRecipes = async () => {
  try {
    const response = await fetch("http://localhost:3001/loadRecipes");
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error("Fehler beim Abrufen der Daten");
    }
  } catch (error) {
    console.error("Fehler beim Senden der Anfrage:", error);
  }
};
