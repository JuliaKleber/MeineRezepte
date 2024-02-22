import useUserStore from "../stores/userStore";

export const login = async (username, password) => {
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
      useUserStore.setState({ loginMessage: data.message });
      return false;
    }
  } catch (error) {
    useUserStore.setState({ loginMessage: error });
  }
};

export const register = async (username, password, email) => {
  try {
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      useUserStore.setState({
        isLoggedIn: false,
        registerMessage: `${data.message}`,
      });
      return;
    }
    return data;
  } catch (error) {
    useUserStore.setState({
      isLoggedIn: false,
      registerMessage:
        "Fehler beim Erstellen des Nutzers. Bitte versuche es später noch mal.",
    });
    console.error("Fehler beim Erstellen des Nutzers: ", error);
    return null;
  }
};

export const deleteAccountByUsername = async (username) => {
  try {
    const response = await fetch(`http://localhost:3001/users/deleteByUsername/${username}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.status === 200) {
      useUserStore.setState({ isLoggedIn: false });
      return true;
    } else {
      useUserStore.setState({ deleteAccountMessage: `Fehler beim Löschen des Nutzers: ${data.message}` });
      return false;
    }
  } catch (error) {
    useUserStore.setState({ deleteAccountMessage: `Fehler beim Löschen des Nutzers: ${error}` });
  }
}
