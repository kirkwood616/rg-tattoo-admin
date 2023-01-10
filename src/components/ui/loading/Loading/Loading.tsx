import { ReactComponent as LoadingLogo } from "assets/logos/rackxruin_skull.svg";
import "./Loading.css";

function Loading() {
  return (
    <div className="Loading">
      <LoadingLogo />
      <div className="loading_text">
        <h1>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </h1>
      </div>
    </div>
  );
}

export default Loading;
