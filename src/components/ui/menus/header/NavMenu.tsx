import { useState } from "react";
import { toggleBooleanState } from "utils/Toggle";
import MenuHamburger from "./MenuHamburger";
import MenuList from "./MenuList";
import "./NavMenu.css";

function NavMenu() {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  return (
    <div className="NavMenu">
      <div className={isMenuActive ? "menu-click-background" : ""} onClick={() => toggleBooleanState(setIsMenuActive)}></div>
      <div className="nav-container">
        <button
          onClick={() => toggleBooleanState(setIsMenuActive)}
          className={isMenuActive ? "menu-trigger active" : "menu-trigger"}
        >
          <MenuHamburger isActive={isMenuActive} />
        </button>
        <nav onClick={() => toggleBooleanState(setIsMenuActive)} className={`menu ${isMenuActive ? "active" : "inactive"}`}>
          <MenuList />
        </nav>
      </div>
    </div>
  );
}

export default NavMenu;
