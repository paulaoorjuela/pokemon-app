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
      return !isNaN(input) && input > 0; // Validate that the ID is a positive number
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
            : { id: parseInt(searchInput, 10) };

        const { data } = await client.query({
          query: query,
          variables: variables,
        });

        if (data.pokemon_v2_pokemonspecies.length > 0) {
          // Set search results to the list
          setSearchResults(data.pokemon_v2_pokemonspecies);
        } else {
          alert("Pokémon not found");
          setSearchResults([]); // Clear results if not found
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
        <input
          type="text"
          placeholder="Search Pokémon"
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
        <div className="modal">
          <h2>Select Search Type</h2>
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
            ID
          </label>
          <button onClick={toggleModal}>Close</button>{" "}
          {/* Close modal button */}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
