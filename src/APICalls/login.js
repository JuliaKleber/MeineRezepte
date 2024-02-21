import useRecipeStore from "../stores/recipeStore";

const login = async (username, password) => {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 200 && data.userId) {
      useRecipeStore.setState({ isLoggedIn: true });
      useRecipeStore.setState({ currentUserId: data.userId });
    } else {
      useRecipeStore.setState({ loginMessage: `Fehler beim Prüfen der Nutzerdaten: ${data.message}` });
    }
  } catch (error) {
    useRecipeStore.setState({ loginMessage: `Fehler beim Prüfen der Nutzerdaten: ${error}` });
  }
};

export default login;
