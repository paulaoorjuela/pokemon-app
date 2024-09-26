import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert"; // custom Alert component

// GraphQL Pokémon Detail (by id)
const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      weight
      height
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonmoves(limit: 2) {
        pokemon_v2_move {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        flavor_text: pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
          limit: 1
        ) {
          flavor_text
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`;

const PokemonDetail = () => {
  const { id } = useParams();
  //Execute the GraphQLquery to fetch details
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: parseInt(id) },
  });
  const [favorites, setFavorites] = useState([]); // State for managing favorite Pokémon
  const [alertMessage, setAlertMessage] = useState(null); // State for alert messages

  // Function to show a custom alert message
  const showCustomAlert = (message) => {
    setAlertMessage(message);
  };
  // Function to close the alert message
  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  // Load favorites from sessionStorage when the component loads
  useEffect(() => {
    const savedFavorites =
      JSON.parse(sessionStorage.getItem("favorites")) || []; // Get saved favoritesto an empty array
    setFavorites(savedFavorites); // Set favorites state
  }, []);

  const addFavorite = () => {
    if (data && data.pokemon_v2_pokemon_by_pk) {
      const pokemon = data.pokemon_v2_pokemon_by_pk;
      const favoritePokemon = {
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        id: pokemon.id,
      };
      // Check if the Pokémon is already a favorite
      if (!favorites.some((fav) => fav.name === favoritePokemon.name)) {
        const updatedFavorites = [...favorites, favoritePokemon]; // Update favorites list
        setFavorites(updatedFavorites); // Update state
        showCustomAlert("Added to favorites"); // Show success alert
        sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save favorites to sessionStorage
      } else {
        showCustomAlert("This Pokémon is already in your favorites.");
      }
    }
  };

  // colors for Pokémon types
  const typeColors = {
    grass: "#74CB48",
    fire: "#F57D31",
    water: "#6493EB",
    bug: "#A7B723",
    electric: "#F9CF30",
    psychic: "#FB5584",
    fairy: "#E69EAC",
    normal: "#AAA67F",
    fighting: "#C12239",
    flying: "#A891EC",
    poison: "#A43E9E",
    ground: "#DEC16B",
    rock: "#B69E31",
    ghost: "#70559B",
    ice: "#9AD6DF",
    dragon: "#7037FF",
    steel: "#B7B9D0",
    dark: "#75574C",
  };
  // abbreviations for Pokémon stats
  const statAbbreviations = {
    speed: "SPD",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    hp: "HP",
  };

  // Show loading spinner while loading
  if (loading)
    return (
      <img
        className="pokeball-loader"
        src="/src/assets/images/PokeLoader.gif"
      />
    );
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data.pokemon_v2_pokemon_by_pk;
  const types = pokemon.pokemon_v2_pokemontypes.map(
    (t) => t.pokemon_v2_type.name
  );
  const mainType = types[0];// get main type for styling
  const bgColor = typeColors[mainType]; // pokemon detail bg color

  return (
    <div
      className="pokemon-detail-container"
      style={{ backgroundColor: bgColor }}
    >
      <img
        className="pokeball-bg"
        src="/src/assets/images/Pokeball.svg"
        alt="pokeball"
      />
      <div className="pokemon-header" style={{ backgroundColor: bgColor }}>
        <Link to={`/`}>
          <button className="back-button">&#8592;</button>
        </Link>
        <h1 className="poppins-bold pokemon-name-detail">{pokemon.name}</h1>
        <span className="poppins-light pokemon-id-detail">
          #{String(pokemon.id).padStart(3, "0")}{/* Display Pokémon ID with leading zeros */}
        </span>
      </div>

      <img
        className="pokemon-image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
      />

      <div className="pokemon-about-section">
        <div className="pokemon-type-tags">
          {types.map((type) => (
            <span
              key={type}
              className="poppins-bold pokemon-type"
              style={{ backgroundColor: typeColors[type] }}
            >
              {type}
            </span>
          ))}
        </div>

        <h2
          style={{
            color: bgColor,
            textAlign: "center",
            fontSize: "16px",
          }}
          className="poppins-bold"
        >
          About
        </h2>
        <div className="poppins-light pokemon-info-grid">
          <div>
            <p>
              <img src="/src/assets/images/weight-icon.svg" />
              <strong> {pokemon.weight / 10} kg</strong>{/* Display weight */}
            </p>
            <span>Weight</span>
          </div>
          <div className="dividing-line"></div>
          <div>
            <p>
              <img src="/src/assets/images/height-icon.svg" />
              <strong> {pokemon.height / 10} m</strong>{/* Display height */}
            </p>
            <span>Height</span>
          </div>
          <div className="dividing-line"></div>
          <div>
            <p>
              <strong>
                {pokemon.pokemon_v2_pokemonabilities
                  .map((ab) => ab.pokemon_v2_ability.name)
                  .join(", ")}{/* Display abilities */}
              </strong>
            </p>
            <span>Abilities</span>
          </div>
        </div>
        <p className="poppins-regular pokemon-description">{/* Display flavor text */}
          {pokemon.pokemon_v2_pokemonspecy.flavor_text[0]?.flavor_text}
        </p>

        <div className="pokemon-stats-section">
          <h2
            style={{
              color: bgColor,
              textAlign: "center",
              fontSize: "16px",
              marginBottom: "10px",
            }}
            className="poppins-bold"
          >
            Base Stats
          </h2>
          {pokemon.pokemon_v2_pokemonstats &&
            pokemon.pokemon_v2_pokemonstats.map((statObj) => (
              <div className="stat-row" key={statObj.pokemon_v2_stat.name}>
                <div
                  className="poppins-bold stat-name"
                  style={{ color: bgColor }}
                >{/* Display stat name */}
                  {statAbbreviations[statObj.pokemon_v2_stat.name] ||
                    statObj.pokemon_v2_stat.name.toUpperCase()}
                </div>
                <div className="poppins-light stat-value">{/* Display stat value */}
                  {statObj.base_stat}
                </div>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${statObj.base_stat}%`,// Set width of the stat bar based on stat value
                      backgroundColor: bgColor,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={() => addFavorite(pokemon)}
          className="add-favorites-button"
        >
          &#x2764; Add to Favorites
        </button>
      </div>
      {/* Show alert message if present */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type="success"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default PokemonDetail;
