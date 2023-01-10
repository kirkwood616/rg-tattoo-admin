import InfoSection from "components/ui/info-section/InfoSection";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Link } from "react-router-dom";
import { formatUsDate } from "utils/Formatting";

interface SearchResultsProps {
  results: AppointmentRequest[];
}

function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="SearchResults">
      <h2>
        {results.length} Result{(results.length > 1 || !results.length) && "s"}
      </h2>
      {results.map((result, index) => (
        <Link to={`../${result.requestStatus}/${result._id}`} key={result._id! + index} style={{ textDecoration: "none" }}>
          <InfoSection title={`${result.firstName} ${result.lastName}`} body={formatUsDate(result.requestDate)} />
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
