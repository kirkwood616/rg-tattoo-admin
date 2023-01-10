import AppointmentRequestMenu from "components/ui/menus/AppointmentRequestMenu/AppointmentRequestMenu";
import { Outlet } from "react-router-dom";
import "./AppointmentRequests.css";

function AppointmentRequests() {
  return (
    <div className="AppointmentRequests">
      <AppointmentRequestMenu />
      <Outlet />
    </div>
  );
}

export default AppointmentRequests;
