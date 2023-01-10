import RequestActions from "components/features/request-actions/RequestActions/RequestActions";
import * as RequestSection from "components/features/request-section";
import FetchError from "components/ui/errors/FetchError/FetchError";
import Loading from "components/ui/loading/Loading/Loading";
import Page from "components/ui/page/Page";
import ActionContextProvider from "context/ActionContext/ActionContextProvider";
import useLocationTools from "hooks/useLocationTools";
import { fetchPhotoUrls, getRequest } from "services/AdminApiService";
import useSWR from "swr";
import "./AppointmentRequestById.css";

function AppointmentRequestById() {
  const { route, id, title } = useLocationTools();
  const { data: request, error: requestError } = useSWR(`appointment-requests/${route}/${id}`, getRequest, {
    revalidateOnFocus: false,
  });
  const { data: photos } = useSWR(() => request, fetchPhotoUrls, { revalidateOnFocus: false });

  if (requestError) return <FetchError fetchError={requestError} />;
  if (!request) return <Loading />;
  return (
    <Page title={`${title} Request`}>
      <div className="AppointmentRequestById">
        <h2>{title} Request</h2>
        <RequestSection.RequestDetails request={request} />
        <RequestSection.CustomerDetails request={request} />
        <RequestSection.TattooDetails request={request} photos={photos} />
        <RequestSection.HistoryLog request={request} />
      </div>

      <ActionContextProvider>
        <RequestActions request={request} />
      </ActionContextProvider>
    </Page>
  );
}

export default AppointmentRequestById;
