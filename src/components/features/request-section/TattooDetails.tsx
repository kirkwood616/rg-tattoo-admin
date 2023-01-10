import InfoSection from "components/ui/info-section/InfoSection";
import { AppointmentRequest, PhotoUrls } from "models/AppointmentRequest";
import RequestSection from "./RequestSection";

interface TattooDetailsProps {
  request: AppointmentRequest;
  photos: PhotoUrls | undefined;
}

function TattooDetails({ request, photos }: TattooDetailsProps) {
  return (
    <RequestSection title="TATTOO DETAILS">
      <InfoSection title="STYLE" body={request.tattooStyle} />
      <InfoSection title="PLACEMENT" body={request.tattooPlacement} />
      <InfoSection title="BUDGET" body={request.budget} />
      <InfoSection
        title="DESCRIPTION"
        body={
          <div
            className="request-item_info"
            dangerouslySetInnerHTML={{ __html: request.tattooDescription }}
            style={{ whiteSpace: "pre-line" }}
          ></div>
        }
      />
      <InfoSection
        title="REFERENCE PHOTO"
        body={
          <a href={`${photos?.referencePhotoURL}`} target="_blank" rel="noopener noreferrer">
            {request.referencePhotoPath}
          </a>
        }
      />

      {photos?.placementPhotoURL && (
        <InfoSection
          title="PLACEMENT PHOTO"
          body={
            <a href={`${photos.placementPhotoURL}`} target="_blank" rel="noopener noreferrer">
              {request.placementPhotoPath}
            </a>
          }
        />
      )}
    </RequestSection>
  );
}

export default TattooDetails;
