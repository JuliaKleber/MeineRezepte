import useRecipeStore from "../stores/recipeStore";

const createUser = async (username, password, email) => {
  try {
    const response = await fetch("http://localhost:3001/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      useRecipeStore.setState({
        isLoggedIn: false,
        message:
          `Fehler beim Erstellen des Nutzers: ${data.message}`,
      });
      return;
    }
    useRecipeStore.setState({ isLoggedIn: true, userId: data.userId });
  } catch (error) {
    useRecipeStore.setState({
      isLoggedIn: false,
      message:
        "Fehler beim Erstellen des Nutzers. Bitte versuche es später noch mal.",
    });
    console.error("Fehler beim Erstellen des Nutzers: ", error);
  }
};

export default createUser;
