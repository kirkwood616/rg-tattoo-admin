import FetchError from "components/ui/errors/FetchError/FetchError";
import InfoSection from "components/ui/info-section/InfoSection";
import Loading from "components/ui/loading/Loading/Loading";
import Page from "components/ui/page/Page";
import useLocationTools from "hooks/useLocationTools";
import { Link } from "react-router-dom";
import { getRequests } from "services/AdminApiService";
import { adminLocaleTZ } from "settings/AdminSettings";
import useSWR from "swr";
import { formatISODateTime, formatTimeWithZone, formatUsDate } from "utils/Formatting";

function RequestsListByStatus() {
  const { route, title } = useLocationTools();
  const { data: requests, error: requestsError } = useSWR(`appointment-requests/${route}`, getRequests, {
    revalidateOnFocus: false,
  });

  if (requestsError) return <FetchError fetchError={requestsError} />;
  if (!requests) return <Loading />;
  return (
    <Page title={`${title} Requests`}>
      <div className="requests-list_container">
        <h2>{requests.length ? `${title} Requests` : `No ${title} Requests`}</h2>

        {requests.map((request, index) => (
          <Link to={request._id!} key={index + request._id!}>
            <InfoSection
              title={`${formatUsDate(request.requestDate)} @ ${formatTimeWithZone(request.requestTime, adminLocaleTZ)}`}
              body={
                <>
                  <p>
                    {request.firstName} {request.lastName}
                  </p>
                  <p>{request.email}</p>
                  <p>Submitted: {formatISODateTime(request.requestSubmittedDate, adminLocaleTZ)}</p>
                </>
              }
            />
          </Link>
        ))}
      </div>
    </Page>
  );
}

export default RequestsListByStatus;
