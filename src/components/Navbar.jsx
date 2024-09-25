import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput"; // Import SearchInput component

const Navbar = ({ setSearchResults, searchType, setSearchType }) => {
  const location = useLocation(); // Get current location from router

  return (
    <>
    {/* Render the navbar only if the current path does not start with "/pokemon/" */}
      {!location.pathname.startsWith("/pokemon/") && (
        <nav className="navbar">
          <Link
            className="icon"
            to={`/`}
          >
            <img src="/Pokeballicon.svg" alt="Logo" className="logo" />
            <p className="poppins-bold">Pokédex</p>
          </Link>
          <SearchInput
            setSearchResults={setSearchResults}// updates search results
            searchType={searchType}// Current search type (by name or id)
            setSearchType={setSearchType}// updates the search type
          />
        </nav>
      )}
    </>
  );
};

export default Navbar;
