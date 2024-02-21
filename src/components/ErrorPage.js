import { useRouteError } from "react-router-dom";
import useuserStore from "../stores/userStore";
import Login from "../routes/Login";

const ErrorPage = () => {
  const isLoggedIn = useuserStore((state) => state.isLoggedIn);
  const error = useRouteError();
  console.error(error);

  return isLoggedIn ? (
    <div className="container">
      <h2>Oups!</h2>
      <p>Ein unerwarteter Fehler ist aufgetreten:</p>
      <p>
        <em>{error.statusText || error.message}</em>
      </p>
    </div>
  ) : (
    <Login />
  );
};

export default ErrorPage;
