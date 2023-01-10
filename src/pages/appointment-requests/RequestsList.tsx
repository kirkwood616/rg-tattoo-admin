import useLocationTools from "hooks/useLocationTools";
import RequestsListByStatus from "pages/appointment-requests/RequestsListByStatus";
import { Outlet } from "react-router-dom";

function RequestList() {
  const { id } = useLocationTools();

  return <>{id ? <Outlet /> : <RequestsListByStatus />}</>;
}

export default RequestList;
