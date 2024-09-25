import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);// State to set favorite Pokémon

  useEffect(() => {
    // loads favorites Pokémon from sessionStorage
    const storedFavorites =
      JSON.parse(sessionStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);// Updates the favorites state
  }, []);

  return (
    <>
      <h1 className="poppins-bold favorites-title">Your favorites</h1>
      <div className="pokemon-list">
        {favorites.length > 0 ? (// Checks if there are any favorite Pokémon
          favorites.map((pokemon) => (// Maps through each favorite
            <div key={pokemon.id} className="pokemon-card">
              <Link className="pokemon-link" to={`/pokemon/${pokemon.id}`}>{/* Link to Pokémon detail page */}
                <p className="poppins-light pokemon-id">
                  #{pokemon.id.toString().padStart(3, "0")}{/* Display Pokémon ID with leading zeros */}
                </p>
                <img src={pokemon.image} alt={pokemon.name} />
                <p className="poppins-regular pokemon-name">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{/* Capitalize first letter of the name */}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className="poppins-light no-pokemon-message">No favorite Pokémon yet!</p>
        )}
      </div>
    </>
  );
};

export default Favorites;
