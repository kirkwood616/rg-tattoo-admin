import { ReactComponent as Skull } from "assets/logos/rackxruin_skull.svg";
import GoButton from "components/ui/buttons/GoButton/GoButton";
import ErrorBubble from "components/ui/errors/ErrorBubble/ErrorBubble";
import Loading from "components/ui/loading/Loading/Loading";
import AppContext from "context/AppContext/AppContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import useAuthCheck from "hooks/useAuthCheck";
import { FormEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import "./LogIn.css";

function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toggleLoading } = useContext(AppContext);
  const { user, checkingAuth } = useAuthCheck();

  async function onSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    toggleLoading();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  if (checkingAuth) return <Loading />;
  if (user) return <Navigate to="/admin" />;
  return (
    <div className="LogIn">
      <form onSubmit={onSubmit}>
        <Skull className="skull_login" />
        <div className="input_container">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errorMessage.includes("user-not-found") && <ErrorBubble errorMessage={"USER NOT FOUND"} />}
        </div>
        <div className="input_container">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="PASSWORD"
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage.includes("wrong-password") && <ErrorBubble errorMessage={"INCORRECT PASSWORD"} />}
        </div>
        <GoButton type="submit" text="LOG IN" cssClass="button_primary" />
      </form>
    </div>
  );
}

export default LogIn;
