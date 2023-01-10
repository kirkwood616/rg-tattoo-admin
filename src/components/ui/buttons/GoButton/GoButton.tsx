import { ButtonClassCSS } from "models/Buttons";
import { FormEvent } from "react";
import "./GoButton.css";

interface GoButtonProps {
  text: string;
  cssClass?: ButtonClassCSS;
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
  onClick?: () => void | Promise<void> | ((e: FormEvent<HTMLFormElement>) => void);
}

function GoButton({ type, text, onClick, isDisabled, cssClass }: GoButtonProps): JSX.Element {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`go-button ${isDisabled ? "button_disabled" : cssClass}`}
    >
      {text}
    </button>
  );
}

export default GoButton;
