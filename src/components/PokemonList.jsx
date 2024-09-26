import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

// GraphQL Pokémon List Query
export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

const PokemonList = ({ searchResults, searchType }) => {
  const [offset, setOffset] = useState(0);// State to manage pagination offset
  const limit = 18;// limit the number of Pokémon to display per page
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },// Pass limit and offset as variables
  });

  if (loading) return <img className="pokeball-loader" src="/src/assets/images/PokeLoader.gif"/>;
  if (error) return <p>Error: {error.message}</p>;

  const hasNext = data.pokemon_v2_pokemon.length === limit;// Checks if there's a next page
  const hasPrevious = offset > 0;// Checks if there's a previous page

  // Determine Pokémon to display
  let pokemonsToDisplay =
    searchResults.length > 0 ? searchResults : data.pokemon_v2_pokemon;

  // Sort alphabetically if searchType is "name"
  if (searchType === "name") {
    pokemonsToDisplay = [...pokemonsToDisplay].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <>
      <div className="pokemon-list">
        {pokemonsToDisplay.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <Link className="pokemon-link" to={`/pokemon/${pokemon.id}`}>
              <p className="poppins-light pokemon-id">
                #{pokemon.id.toString().padStart(3, "0")}{/* Display Pokémon ID with leading zeros */}
              </p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <p className="poppins-regular pokemon-name">
                {capitalizeFirstLetter(pokemon.name)}{/* Capitalize first letter Pokémon name */}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}// Decrease offset, so it doesn't go below 0
          disabled={!hasPrevious}// Disable if no previous pages
          className="poppins-regular"
        >
          ← Prev
        </button>
        <button
          onClick={() => setOffset((prev) => prev + limit)}// Increase offset for the next page
          disabled={!hasNext}// Disable if no next pages
          className="poppins-regular"
        >
          Next →
        </button>
      </div>
    </>
  );
};

export default PokemonList;
