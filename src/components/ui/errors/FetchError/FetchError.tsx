import { ReactComponent as ErrorImage } from "assets/errors/rackxruin_error.svg";
import "./FetchError.css";

interface FetchErrorProps {
  fetchError: Error;
}

function FetchError({ fetchError }: FetchErrorProps) {
  return (
    <div className="FetchError">
      <ErrorImage />
      <h1>{fetchError.message}</h1>
    </div>
  );
}

export default FetchError;
