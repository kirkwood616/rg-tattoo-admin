import NavMenu from "components/ui/menus/header/NavMenu";
import "./Header.css";

function Header() {
  return (
    <div className="Header">
      <span className="site-title">rackxruin</span>
      <NavMenu />
    </div>
  );
}

export default Header;
