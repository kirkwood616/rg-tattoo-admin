import { ReactComponent as Skull } from "assets/logos/rackxruin_skull.svg";
import "./LoadingDots.css";

function LoadingDots() {
  return (
    <div className="LoadingDots">
      <Skull className="skull first" />
      <Skull className="skull second" />
      <Skull className="skull third" />
    </div>
  );
}

export default LoadingDots;
