import { useState } from "react";
import { Link } from "react-router-dom";
import { requestTypes } from "settings/AdminSettings";
import { toggleBooleanState } from "utils/Toggle";
import "./AppointmentRequestMenu.css";

function AppointmentRequestMenu() {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  return (
    <div
      className={isMenuActive ? "menu-container" : "menu-container menu-container_hide"}
      onClick={() => toggleBooleanState(setIsMenuActive)}
    >
      <div
        className={isMenuActive ? "requests-menu open" : "requests-menu"}
        onClick={(e) => {
          e.stopPropagation();
          toggleBooleanState(setIsMenuActive);
        }}
      >
        <div className="requests-menu_title">REQUESTS MENU</div>
        <div className={isMenuActive ? "requests-menu-list active" : "requests-menu-list inactive"}>
          <Link to={"./"}>
            <button className="menu-link">MAIN</button>
          </Link>
          <Link to={"search"}>
            <button className="menu-link">SEARCH</button>
          </Link>
          {requestTypes.map((request, index) => (
            <Link to={request.path} key={request.name + index}>
              <button className="menu-link" value={request.name}>
                {request.name.toUpperCase()}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppointmentRequestMenu;
