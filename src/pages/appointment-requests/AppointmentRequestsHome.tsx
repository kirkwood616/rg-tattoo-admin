import FetchError from "components/ui/errors/FetchError/FetchError";
import Loading from "components/ui/loading/Loading/Loading";
import Page from "components/ui/page/Page";
import { StatusCount } from "models/StatusCount";
import { Link } from "react-router-dom";
import { getRequestStatusCounts } from "services/AdminApiService";
import useSWR from "swr";
import { formatRouteTitle } from "utils/Formatting";
import "./AppointmentRequestsHome.css";

function AppointmentRequestsHome() {
  const { data: counts, error: countsError } = useSWR<StatusCount[], Error>(
    "appointment-requests/status-count",
    getRequestStatusCounts,
    {
      revalidateOnFocus: false,
    }
  );

  if (countsError) return <FetchError fetchError={countsError} />;
  if (!counts) return <Loading />;
  return (
    <Page title={"Appointment Requests"}>
      <div className="AppointmentRequestsHome">
        <h1>Main</h1>
        {counts.map((item, index) => (
          <Link to={item._id} key={item._id + index}>
            <div className="count_container">
              <div className="count_number">{item.count}</div>
              <div className="count_status">{formatRouteTitle(item._id)}</div>
            </div>
          </Link>
        ))}
      </div>
    </Page>
  );
}

export default AppointmentRequestsHome;
