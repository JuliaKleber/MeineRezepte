import useUserStore from "../stores/userStore";

const login = async (username, password) => {
  try {
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 200 && data.userId) {
      useUserStore.setState({ isLoggedIn: true });
      useUserStore.setState({ currentUserId: data.userId });
      return true;
    } else {
      useUserStore.setState({ loginMessage: `Fehler beim Prüfen der Nutzerdaten: ${data.message}` });
      return false;
    }
  } catch (error) {
    useUserStore.setState({ loginMessage: `Fehler beim Prüfen der Nutzerdaten: ${error}` });
  }
};

export default login;
