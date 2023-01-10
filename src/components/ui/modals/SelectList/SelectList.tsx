import AppContext from "context/AppContext/AppContext";
import { Dispatch, SetStateAction, useContext } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import "./SelectList.css";

interface SelectListProps {
  isSelectActive: boolean;
  setIsSelectActive: Dispatch<SetStateAction<boolean>>;
  selectList: string[];
  selectFunction?: (arg: string) => void;
  formatter?: (arg: string) => string;
}

function SelectList({ isSelectActive, setIsSelectActive, selectList, selectFunction, formatter }: SelectListProps) {
  const { toggleModalOpen } = useContext(AppContext);

  function onSelectClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (selectFunction) selectFunction(e.currentTarget.value);
    toggleModalOpen(setIsSelectActive);
  }
  return (
    <ModalWindow isActive={isSelectActive} setIsActive={setIsSelectActive}>
      <div className="select_container">
        {!selectList.length && (
          <button className="select-option" onClick={() => toggleModalOpen(setIsSelectActive)}>
            None Available
          </button>
        )}
        {selectList &&
          selectList.map((item, index) => (
            <button value={item} key={item + index} className="select-option" onClick={(e) => onSelectClick(e)}>
              {formatter ? formatter(item) : item}
            </button>
          ))}
      </div>
    </ModalWindow>
  );
}

export default SelectList;
