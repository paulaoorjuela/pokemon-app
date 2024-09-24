import React, { useState } from "react";
import client from "../apolloClient";
import { gql } from "@apollo/client";

const GET_POKEMON_BY_NAME = gql`
  query getPokemonByName($name: String!) {
    pokemon_v2_pokemonspecies(where: { name: { _eq: $name } }) {
      id
      name
    }
  }
`;

const GET_POKEMON_BY_ID = gql`
  query getPokemonById($id: Int!) {
    pokemon_v2_pokemonspecies(where: { id: { _eq: $id } }) {
      id
      name
    }
  }
`;

const SearchInput = ({ setSearchResults }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name"); // State to track search type (name or id)
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const validateInput = (input) => {
    if (searchType === "name") {
      const regex = /^[a-zA-Z0-9]{3,}$/;
      return regex.test(input);
    } else {
      const regex = /^#\d{1,3}$/;
      return regex.test(input);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (validateInput(searchInput)) {
      try {
        const query =
          searchType === "name" ? GET_POKEMON_BY_NAME : GET_POKEMON_BY_ID;
        const variables =
          searchType === "name"
            ? { name: searchInput.toLowerCase() }
            // Remove "#" and convert to integer
            : { id: parseInt(searchInput.replace("#", ""), 10) };

        const { data } = await client.query({
          query: query,
          variables: variables,
        });

        if (data.pokemon_v2_pokemonspecies.length > 0) {
          setSearchResults(data.pokemon_v2_pokemonspecies);
        } else {
          alert("Pokémon not found");
          setSearchResults([]);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching Pokémon details.");
      }
    } else {
      alert("Invalid input. Please check your input.");
    }
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div>
      <form
        className="search-form"
        id="searchForm"
        onSubmit={handleSearchSubmit}
      >
        <img src="src/assets/images/MagnifyingGlassIcon.svg" alt="" />
        <input
          className="poppins-regular"
          type="text"
          placeholder="Search"
          id="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="button" onClick={toggleModal}>
          #
        </button>{" "}
        {/* Button to open the modal */}
      </form>

      {isModalOpen && (
        <div className="sort-by-dropdown">
          <p className="poppins-regular">Sort by:</p>
          <div className="poppins-regular sort-options">
            <label>
              <input
                type="radio"
                value="name"
                checked={searchType === "name"}
                onChange={() => setSearchType("name")}
              />
              Name
            </label>
            <label>
              <input
                type="radio"
                value="id"
                checked={searchType === "id"}
                onChange={() => setSearchType("id")}
              />
              Number
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
