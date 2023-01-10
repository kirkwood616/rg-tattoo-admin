import InfoSection from "components/ui/info-section/InfoSection";
import { AppointmentRequest } from "models/AppointmentRequest";
import { adminLocaleTZ } from "settings/AdminSettings";
import { formatISODateTime, formatRouteTitle, formatTimeWithZone, formatUsDate } from "utils/Formatting";
import RequestSection from "./RequestSection";

interface RequestDetailsProps {
  request: AppointmentRequest;
}

function RequestDetails({ request }: RequestDetailsProps) {
  return (
    <RequestSection title="REQUEST DETAILS">
      <InfoSection title={"REQUEST STATUS"} body={formatRouteTitle(request.requestStatus)} />
      <InfoSection title={"REQUESTED DATE"} body={formatUsDate(request.requestDate)} />
      <InfoSection title={"REQUESTED TIME"} body={formatTimeWithZone(request.requestTime, adminLocaleTZ)} />
      <InfoSection title={"DATE SUBMITTED"} body={formatISODateTime(request.requestSubmittedDate, adminLocaleTZ)} />

      {request.requestStatus !== "new" && <InfoSection title="DEPOSIT REQUIRED" body={`$${request.depositRequired}`} />}

      {request.depositAmmountReceived > 0 && (
        <InfoSection title={"DEPOSIT RECEIVED"} body={`$${request.depositAmmountReceived}`} />
      )}

      {request.priceCharged > 0 && <InfoSection title={"PRICE CHARGED"} body={`$${request.priceCharged}`} />}
    </RequestSection>
  );
}

export default RequestDetails;
