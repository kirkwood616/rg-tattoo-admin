import GoButton from "components/ui/buttons/GoButton/GoButton";
import ModalWindow from "components/ui/modals/ModalWindow/ModalWindow";
import AppContext from "context/AppContext/AppContext";
import { Dispatch, SetStateAction, useContext } from "react";
import "./AreYouSure.css";

interface AreYouSureProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  yesFunction: () => Promise<void> | void;
  yesButtonText: string;
  subModal?: boolean;
}

function AreYouSure({ isActive, setIsActive, yesFunction, yesButtonText, subModal }: AreYouSureProps) {
  const { toggleModalOpen } = useContext(AppContext);

  function handleCancel(): void {
    if (subModal) setIsActive((current) => !current);
    else toggleModalOpen(setIsActive);
  }

  return (
    <ModalWindow isActive={isActive} closeFunction={handleCancel}>
      <div className="are-you-sure">
        <h2>Are You Sure?</h2>
        <GoButton text={yesButtonText} cssClass="button_primary" onClick={yesFunction} />
        <GoButton text="CANCEL" cssClass="button_cancel" onClick={handleCancel} />
      </div>
    </ModalWindow>
  );
}

export default AreYouSure;
