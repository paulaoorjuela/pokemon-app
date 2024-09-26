import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList.jsx";// Component for displaying Pokémon list
import PokemonDetail from "./pages/PokemonDetail";// Component for Pokémon details
import Navbar from "./components/Navbar.jsx";// Navigation bar component
import Favorites from "./pages/Favorites.jsx";// Component for favorite Pokémon
import "./styles.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);// State for search results
  const [searchType, setSearchType] = useState("name");// State for search type (default is "name")

  return (
    <ApolloProvider client={client}>{/* Provide Apollo client to components */}
      <Router>
        <div className="app-container">
          <Navbar
            setSearchResults={setSearchResults}// Function to update search results
            searchType={searchType}// Current search type
            setSearchType={setSearchType}// Function to update search type
          />
          <main>
            <Routes>{/* routes for the application */}
              <Route
                path="/"
                element={
                  <PokemonList
                    searchResults={searchResults}// Pass search results to PokemonList
                    searchType={searchType}// Pass search type to PokemonList
                  />
                }
              />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Link to="/favorites">
            <button className="go-to-favorites"><img className="heart-icon" src="/src/assets/images/heart-icon.png" alt="" /></button>
          </Link>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
