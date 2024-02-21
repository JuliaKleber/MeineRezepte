import useUserStore from "../stores/userStore";

const register = async (username, password, email) => {
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
        registerMessagePartOne: `Fehler beim Erstellen des Nutzers:`,
        registerMessagePartTwo: `${data.message}`,
      });
      return;
    }
    useUserStore.setState({
      isLoggedIn: true,
      userId: data.userId,
      registerMessage: data.message,
    });
    return true;
  } catch (error) {
    useUserStore.setState({
      isLoggedIn: false,
      registerMessage:
        "Fehler beim Erstellen des Nutzers. Bitte versuche es später noch mal.",
    });
    console.error("Fehler beim Erstellen des Nutzers: ", error);
    return false;
  }
};

export default register;
