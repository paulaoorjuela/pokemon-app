import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

// GraphQL Query
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
  const limit = 18; // limit for pagination
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
  });

  if (loading) return <p className="poppins-regular">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calculate next and previous offsets
  const hasNext = data.pokemon_v2_pokemon.length === limit;
  const hasPrevious = offset > 0;

  const pokemonsToDisplay =
    searchResults.length > 0 ? searchResults : data.pokemon_v2_pokemon;

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
                #{pokemon.id.toString().padStart(3, "0")}
              </p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <p className="poppins-regular pokemon-name">{capitalizeFirstLetter(pokemon.name)}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
          disabled={!hasPrevious} // if there's no previous page
          className="poppins-regular"
        >
          ← Prev
        </button>
        <button
          onClick={() => setOffset((prev) => prev + limit)}
          disabled={!hasNext} // if there's no next page
          className="poppins-regular"
        >
          Next →
        </button>
      </div>
    </>
  );
};

export default PokemonList;
