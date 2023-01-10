import InfoSection from "components/ui/info-section/InfoSection";
import { AppointmentRequest } from "models/AppointmentRequest";
import RequestSection from "./RequestSection";

interface CustomerDetailsProps {
  request: AppointmentRequest;
}

function CustomerDetails({ request }: CustomerDetailsProps) {
  return (
    <RequestSection title="CUSTOMER DETAILS">
      <InfoSection title={"NAME"} body={`${request.firstName} ${request.lastName}`} />
      <InfoSection title={"AGE"} body={request.age} />
      <InfoSection title={"EMAIL"} body={<a href={`mailto: ${request.email}`}>{request.email}</a>} />
      <InfoSection title={"PHONE"} body={request.phoneNumber} />
    </RequestSection>
  );
}

export default CustomerDetails;
