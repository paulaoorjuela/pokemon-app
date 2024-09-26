import React, { useState } from "react";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import Alert from "./Alert"; // custom Alert component

// GraphQL Search Input Query
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

const SearchInput = ({ setSearchResults, searchType, setSearchType }) => {
  const [searchInput, setSearchInput] = useState(""); //State to set the search input
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message

  // Function to show custom alert messages
  const showCustomAlert = (message) => {
    setAlertMessage(message);
  };

  // Function to close alert message
  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  // validates the search input based on the selected search type
  const validateInput = (input) => {
    if (searchType === "name") {
      return /^[a-zA-Z0-9]{3,}$/.test(input);
    } else {
      return /^#\d{1,3}$/.test(input);
    }
  };

  // handles search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // reset search results when input is empty
    if (searchInput.trim() === "") {
      setSearchResults([]);// Clear search results
      return;
    }

    if (validateInput(searchInput)) {// Validates input before making a query
      try {
        const query =
          searchType === "name" ? GET_POKEMON_BY_NAME : GET_POKEMON_BY_ID;// Select query based on search type
        const variables =
          searchType === "name"
            ? { name: searchInput.toLowerCase() }// Prepare variables for name query
            : { id: parseInt(searchInput.replace("#", ""), 10) };// Prepare variables for ID query

        const { data } = await client.query({
          query: query,
          variables: variables,
        });

        if (data.pokemon_v2_pokemonspecies.length > 0) {// Checks if Pokémon is found
          let results = data.pokemon_v2_pokemonspecies;

          // Sort alphabetically if searchType is "name"
          if (searchType === "name") {
            results = results.sort((a, b) => a.name.localeCompare(b.name));
          }

          setSearchResults(results);// Updates search results state
        } else {
          showCustomAlert("Pokémon not found");
          setSearchResults([]);
        }
      } catch (error) {
        console.error(error);
        showCustomAlert("An error occurred while fetching Pokémon details.");
      }
    } else {
      showCustomAlert("Invalid input. Please check your input.");
    }
  };

  // toggles the visibility of the modal
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
        <img src="/src/assets/images/MagnifyingGlassIcon.svg" alt="" />
        <input
          className="poppins-regular"
          type="text"
          placeholder="Search"
          id="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="button" onClick={toggleModal}>
          {searchType === "name" ? "A" : "#"}
        </button>
      </form>

      {isModalOpen && (// Render modal if its open
        <div className="sort-by-dropdown">
          <p className="poppins-regular">Sort by:</p>
          <div className="poppins-regular sort-options">
            <label>
              <input
                type="radio"
                value="name"
                checked={searchType === "name"}// Check if name is selected
                onChange={() => {
                  setSearchType("name");// Update search type to name
                }}
              />
              Name
            </label>
            <label>
              <input
                type="radio"
                value="id"
                checked={searchType === "id"}// Check if name is selected
                onChange={() => {
                  setSearchType("id");// Update search type to ID
                }}
              />
              Number
            </label>
          </div>
        </div>
      )}
      {alertMessage && (// alert if there is a message
        <Alert message={alertMessage} type="error" onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default SearchInput;
