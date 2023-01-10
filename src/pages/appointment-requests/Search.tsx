import FetchError from "components/ui/errors/FetchError/FetchError";
import LoadingDots from "components/ui/loading/LoadingDots/LoadingDots";
import Page from "components/ui/page/Page";
import SearchBar from "components/ui/search/SearchBar/SearchBar";
import SearchResults from "components/ui/search/SearchResults/SearchResults";
import useLocationTools from "hooks/useLocationTools";
import { useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";
import { getSearch } from "services/AdminApiService";
import useSWR from "swr";
import { toggleBooleanState } from "utils/Toggle";

function Search() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { searchParams, setSearchParams } = useLocationTools();
  const { data: results, error: searchError } = useSWR(
    searchParams.get("keywords") ? ["appointment-requests/search", searchParams.get("keywords")] : null,
    onSearch,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const paramsSearch = searchParams.get("keywords");
    if (paramsSearch) setSearchInput(paramsSearch);
    else setSearchInput("");
  }, [searchParams]);

  async function onSearch(search: string[]) {
    toggleBooleanState(setIsSearching);
    try {
      const [url, keywords] = search;
      const results = await getSearch(url, keywords);
      return results;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) throw new Error(error.message);
    } finally {
      setIsSearching((current) => !current);
    }
  }

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchInput) return;
    setSearchParams(createSearchParams({ keywords: searchInput }));
  }

  return (
    <Page title="Search Requests">
      <div className="Search">
        <h1>Search Requests</h1>
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} onSearchSubmit={onSearchSubmit} />
        {searchError && <FetchError fetchError={searchError} />}
        {isSearching && <LoadingDots />}
        {results && <SearchResults results={results} />}
      </div>
    </Page>
  );
}

export default Search;
