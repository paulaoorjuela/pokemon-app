import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

// GraphQL Query for fetching Pokemon with pagination
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

const PokemonList = ({ searchResults }) => {
  const [offset, setOffset] = useState(0);
  const limit = 18; // Set your limit for pagination
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calculate next and previous offsets
  const hasNext = data.pokemon_v2_pokemon.length === limit; // Check if there are more Pokemon to load
  const hasPrevious = offset > 0; // Check if there is a previous page

  const pokemonsToDisplay =
    searchResults.length > 0 ? searchResults : data.pokemon_v2_pokemon;

  return (
    <>
      <div className="pokemon-list">
        {pokemonsToDisplay.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <Link to={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <h5>{pokemon.name}</h5>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
          disabled={!hasPrevious} // Disable if there's no previous page
        >
          Previous
        </button>
        <button
          onClick={() => setOffset((prev) => prev + limit)}
          disabled={!hasNext} // Disable if there's no next page
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PokemonList;
