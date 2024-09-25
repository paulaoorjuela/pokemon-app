import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput"; // Import your SearchInput component

const Navbar = ({ setSearchResults }) => {
  const location = useLocation(); // Get the current location

  return (
    <nav className="navbar">
      {/* Conditionally render logo and search input */}
      {!location.pathname.startsWith("/pokemon/") && (
        <>
          <Link className="icon" to={`/`} onClick={() => window.location.reload()}>
            <img src="/Pokeball.svg" alt="Logo" className="logo" />
            <p className="poppins-bold">Pokédex</p>
          </Link>
          <SearchInput setSearchResults={setSearchResults} />
        </>
      )}
    </nav>
  );
};

export default Navbar;
