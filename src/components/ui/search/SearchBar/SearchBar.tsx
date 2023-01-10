import { ReactComponent as SearchIcon } from "assets/icons/search-glass-icon.svg";
import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function SearchBar({ searchInput, setSearchInput, onSearchSubmit }: SearchBarProps) {
  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setSearchInput(e.target.value);
  }
  return (
    <div className="SearchBar">
      <form onSubmit={(e) => onSearchSubmit(e)}>
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          value={searchInput}
          onChange={(e) => onSearchChange(e)}
          placeholder="Search..."
          autoComplete="off"
        />
        <button type="submit" className="search-icon_button">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
