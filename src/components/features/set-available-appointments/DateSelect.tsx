import AvailableAppointments from "models/AvailableAppointments";
import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import { populateHighlights } from "utils/DatePicker";
import "./DateSelect.css";

interface DateSelectProps {
  available: AvailableAppointments[] | undefined;
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
}

function DateSelect({ available, startDate, setStartDate }: DateSelectProps) {
  return (
    <div className="date-picker_container">
      <span className="label">
        <label htmlFor="date-picker">Date:</label>
      </span>
      <DatePicker
        autoComplete="off"
        name="date-picker"
        id="date-picker"
        selected={startDate}
        minDate={new Date()}
        highlightDates={populateHighlights(available)}
        onChange={(date: Date) => setStartDate(date)}
        withPortal
      />
    </div>
  );
}

export default DateSelect;
