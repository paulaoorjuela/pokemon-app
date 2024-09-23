import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import SearchInput from "./components/SearchInput"; // New component for search bar
import "./styles.css";

// Main App Component
const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app-container">
          <nav className="navbar">
            <img src="assets/img/logo.png" alt="Logo" className="logo" />
            <SearchInput setSearchResults={setSearchResults} />
          </nav>
          <main>
            <Routes>
              <Route
                path="/"
                element={<PokemonList searchResults={searchResults} />}
              />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
