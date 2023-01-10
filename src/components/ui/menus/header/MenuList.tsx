import AreYouSure from "components/ui/modals/AreYouSure/AreYouSure";
import AppContext from "context/AppContext/AppContext";
import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";
import useAuthCheck from "hooks/useAuthCheck";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MenuList() {
  const [isLogOutActive, setIsLogOutActive] = useState<boolean>(false);
  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { setUser } = useAuthCheck();
  const navigate = useNavigate();

  function onLogOut(): void {
    toggleModalOpen(setIsLogOutActive);
  }

  async function handleLogOut(): Promise<void> {
    toggleLoading();
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
      setUser(null);
      navigate("/");
    }
  }

  return (
    <>
      <menu>
        <li>
          <Link to={"/admin/"}>HOME</Link>
        </li>
        <li>
          <Link to={"/admin/appointment-requests"}>APPOINTMENT REQUESTS</Link>
        </li>
        <li>
          <Link to={"/admin/set-available-appointments"}>SET AVAILABLE APPOINTMENTS</Link>
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            onLogOut();
          }}
        >
          <Link to={"#"}>LOG OUT</Link>
        </li>
      </menu>
      {isLogOutActive && (
        <AreYouSure
          isActive={isLogOutActive}
          setIsActive={setIsLogOutActive}
          yesFunction={handleLogOut}
          yesButtonText="YES"
        />
      )}
    </>
  );
}

export default MenuList;
