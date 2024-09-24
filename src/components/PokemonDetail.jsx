import React, { useState, useEffect } from "react"; // Import useEffect
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

const PokemonDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: parseInt(id, 10) },
  });

  const [favorites, setFavorites] = useState([]); // Manage favorites here

  // Load favorites from sessionStorage when the component mounts
  useEffect(() => {
    const savedFavorites =
      JSON.parse(sessionStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const addFavorite = (pokemon) => {
    const favoritePokemon = {
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    };

    if (!favorites.some((fav) => fav.name === favoritePokemon.name)) {
      const updatedFavorites = [...favorites, favoritePokemon];
      setFavorites(updatedFavorites);
      alert("added to favorites");
      // Save updated favorites array to sessionStorage for persistence
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      alert("This Pokémon is already in your favorites.");
    }
  };

  if (loading) return <p className="poppins-regular">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data.pokemon_v2_pokemon_by_pk;

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      <ul>
        <li>
          <strong>Height:</strong> {pokemon.height}
        </li>
        <li>
          <strong>Weight:</strong> {pokemon.weight}
        </li>
        <li>
          <strong>Base Experience:</strong> {pokemon.base_experience}
        </li>
        <li>
          <strong>Abilities:</strong>{" "}
          {pokemon.pokemon_v2_pokemonabilities
            .map((a) => a.pokemon_v2_ability.name)
            .join(", ")}
        </li>
        <li>
          <strong>Types:</strong>{" "}
          {pokemon.pokemon_v2_pokemontypes
            .map((t) => t.pokemon_v2_type.name)
            .join(", ")}
        </li>
      </ul>
      <button onClick={() => addFavorite(pokemon)}>Add to Favorites</button>
    </div>
  );
};

export default PokemonDetail;
