import GoButton from "components/ui/buttons/GoButton/GoButton";
import AppContext from "context/AppContext/AppContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { timePickerValues } from "settings/AdminSettings";
import "./Controls.css";

interface ControlsProps {
  setAppointmentTimes: Dispatch<SetStateAction<string[]>>;
  setIsTimesActive: Dispatch<SetStateAction<boolean>>;
}

function Controls({ setAppointmentTimes, setIsTimesActive }: ControlsProps) {
  const { toggleModalOpen } = useContext(AppContext);

  return (
    <>
      <div className="Controls">
        <div className="all-times_container">
          <GoButton text="ADD ALL TIMES" onClick={() => setAppointmentTimes(timePickerValues!)} />
          <GoButton text="REMOVE ALL TIMES" onClick={() => setAppointmentTimes([])} />
        </div>
      </div>
      <div className="add-time">
        <GoButton text="ADD TIME" onClick={() => toggleModalOpen(setIsTimesActive)} />
      </div>
    </>
  );
}

export default Controls;
