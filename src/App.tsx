import Admin from "components/admin/Admin";
import Loading from "components/ui/loading/Loading/Loading";
import AppContext from "context/AppContext/AppContext";
import AppointmentRequestById from "pages/appointment-requests/AppointmentRequestById";
import AppointmentRequests from "pages/appointment-requests/AppointmentRequests";
import AppointmentRequestsHome from "pages/appointment-requests/AppointmentRequestsHome";
import RequestsList from "pages/appointment-requests/RequestsList";
import Search from "pages/appointment-requests/Search";
import Home from "pages/Home";
import LogIn from "pages/LogIn";
import SetAvailableAppointments from "pages/set-available-appointments/SetAvailableAppointments";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { requestTypes } from "settings/AdminSettings";

function App() {
  const { isLoading } = useContext(AppContext);
  return (
    <div className="App">
      <Router>
        {isLoading && <Loading />}
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route element={<Admin />}>
            <Route path="/admin">
              <Route index element={<Home />} />
              <Route path="appointment-requests" element={<AppointmentRequests />}>
                <Route index element={<AppointmentRequestsHome />} />
                <Route path="search" element={<Search />} />
                {requestTypes.map((request, index) => (
                  <Route path={":route"} element={<RequestsList />} key={request.name + request.path}>
                    <Route path=":id" element={<AppointmentRequestById />} key={request.name + request.path + index} />
                  </Route>
                ))}
              </Route>
              <Route path="set-available-appointments" element={<SetAvailableAppointments />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
