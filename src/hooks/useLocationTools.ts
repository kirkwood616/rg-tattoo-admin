import { Location, Params, useLocation, useParams, useSearchParams } from "react-router-dom";
import { formatRouteTitle } from "utils/Formatting";

export default function useLocationTools() {
  const location: Location = useLocation();
  const pathname: string = location.pathname;
  const params: Readonly<Params<string>> = useParams();
  const route: string | undefined = params.route;
  const id: string | undefined = params.id;
  const title: string = formatRouteTitle(route);
  const isAdmin: boolean = pathname.includes("admin");
  const [searchParams, setSearchParams] = useSearchParams();

  return { location, pathname, params, route, id, title, isAdmin, searchParams, setSearchParams };
}
