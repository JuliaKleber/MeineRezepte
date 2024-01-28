import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="container">
      <h2>Oups!</h2>
      <p>Ein unerwarteter Fehler ist aufgetreten:</p>
      <p>
        <em>{error.statusText || error.message}</em>
      </p>
    </div>
  );
};

export default ErrorPage;
